import {
  ArrowDown,
  ArrowUp,
  Check,
  CloudOff,
  FileDown,
  Link2,
  Plus,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { places } from "../data/places";
import { useI18n } from "../i18n";
import {
  addPlaceToTrip,
  useTrip,
  type TripDay,
  type TripDraft,
} from "../lib/trip";

const stepKeys = [
  "trip",
  "arrival",
  "stay",
  "transport",
  "activities",
  "ready",
  "summary",
] as const;

export default function Planner() {
  const { t, locale } = useI18n();
  const { trip, setTrip } = useTrip();
  const [mode, setMode] = useState<"guided" | "free">("guided");
  const [step, setStep] = useState(0);
  const [view, setView] = useState<"simple" | "detailed">("simple");
  const [shareMessage, setShareMessage] = useState("");
  const activePlaces = useMemo(
    () =>
      trip.days.flatMap((day) =>
        day.steps
          .map((item) => places.find((place) => place.slug === item.placeSlug))
          .filter(Boolean),
      ),
    [trip.days],
  );

  const update = (field: keyof typeof trip, value: unknown) =>
    setTrip((current) => ({ ...current, [field]: value }));
  const skipStep = () => {
    setTrip((current) => ({
      ...current,
      skipped: [...new Set([...current.skipped, stepKeys[step]])],
    }));
    setStep(Math.min(6, step + 1));
  };
  const addDay = () =>
    setTrip((current) => ({
      ...current,
      days: [
        ...current.days,
        {
          id: crypto.randomUUID(),
          title: "",
          steps: [],
        },
      ],
    }));
  const moveStep = (dayIndex: number, itemIndex: number, direction: -1 | 1) =>
    setTrip((current) => ({
      ...current,
      days: current.days.map((day, index) => {
        if (index !== dayIndex) return day;
        const target = itemIndex + direction;
        if (target < 0 || target >= day.steps.length) return day;
        const steps = [...day.steps];
        [steps[itemIndex], steps[target]] = [steps[target], steps[itemIndex]];
        return { ...day, steps };
      }),
    }));
  const removeStep = (dayIndex: number, id: string) =>
    setTrip((current) => ({
      ...current,
      days: current.days.map((day, index) =>
        index === dayIndex
          ? { ...day, steps: day.steps.filter((item) => item.id !== id) }
          : day,
      ),
    }));

  const exportPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    doc.setProperties({ title: trip.title || "MarocoGO" });
    doc.setFontSize(22);
    doc.text("MarocoGO", 18, 22);
    doc.setFontSize(16);
    doc.text(trip.title || t("trip"), 18, 34);
    doc.setFontSize(10);
    doc.text(
      `${trip.startDate || "—"}  →  ${trip.endDate || "—"}   ·   ${trip.travellers}`,
      18,
      43,
    );
    let y = 56;
    trip.days.forEach((day, dayIndex) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(13);
      doc.text(`${dayIndex + 1}. ${day.title || `${t("trip")} ${dayIndex + 1}`}`, 18, y);
      y += 8;
      doc.setFontSize(10);
      if (!day.steps.length) {
        doc.text("—", 23, y);
        y += 7;
      }
      day.steps.forEach((item) => {
        const place = places.find(
          (candidate) => candidate.slug === item.placeSlug,
        );
        doc.text(
          `• ${place?.name[locale] || item.placeSlug}${item.note ? ` — ${item.note}` : ""}`,
          23,
          y,
          { maxWidth: 165 },
        );
        y += 7;
      });
    });
    if (trip.notes) {
      y += 5;
      doc.setFontSize(12);
      doc.text(t("notes"), 18, y);
      y += 7;
      doc.setFontSize(10);
      doc.text(trip.notes, 18, y, { maxWidth: 170 });
    }
    doc.save("marocogo-carnet.pdf");
  };

  return (
    <div className="planner-page">
      <header className="planner-heading">
        <div>
          <p className="eyebrow">MarocoGO</p>
          <h1>{t("prepareTrip")}</h1>
          <p>{t("prepareLead")}</p>
        </div>
        <p className="save-state" role="status">
          <Check aria-hidden="true" />
          {t("saved")}
        </p>
      </header>
      <div className="mode-switch" role="group" aria-label={t("prepare")}>
        <button
          className={mode === "guided" ? "active" : ""}
          onClick={() => setMode("guided")}
        >
          <strong>{t("guided")}</strong>
          <small>{t("guidedLead")}</small>
        </button>
        <button
          className={mode === "free" ? "active" : ""}
          onClick={() => setMode("free")}
        >
          <strong>{t("free")}</strong>
          <small>{t("freeLead")}</small>
        </button>
      </div>

      <section className="planner-shell">
        <nav className="step-nav" aria-label={t("prepare")}>
          {stepKeys.map((key, index) => (
            <button
              key={key}
              className={step === index ? "active" : ""}
              aria-current={step === index ? "step" : undefined}
              onClick={() => setStep(index)}
            >
              <span>{index + 1}</span>
              <strong>{t(key)}</strong>
              {trip.skipped.includes(key) && <small>{t("skip")}</small>}
            </button>
          ))}
        </nav>
        <div className="planner-content">
          {mode === "free" && step !== 6 ? (
            <FreePlanner />
          ) : (
            <GuidedStep step={step} update={update} />
          )}
          {step === 6 && (
            <Journal
              view={view}
              setView={setView}
              moveStep={moveStep}
              removeStep={removeStep}
              addDay={addDay}
              exportPdf={exportPdf}
              setShareMessage={setShareMessage}
            />
          )}
          {shareMessage && (
            <p className="inline-notice" role="status">
              {shareMessage}
            </p>
          )}
          {mode === "guided" && (
            <div className="step-actions">
              <button
                className="secondary-action"
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
              >
                {t("previous")}
              </button>
              <button
                className="text-button"
                onClick={skipStep}
                disabled={step === 6}
              >
                {t("pass")}
              </button>
              <button
                className="primary-action"
                onClick={() => setStep(Math.min(6, step + 1))}
                disabled={step === 6}
              >
                {t("next")}
              </button>
            </div>
          )}
        </div>
      </section>
      <p className="offline-note">
        <CloudOff aria-hidden="true" />
        {t("offlineReady")}
      </p>
      <section className="offer-status">
        <article>
          <small>{t("directOffers")}</small>
          <h2>{t("directUnavailable")}</h2>
        </article>
        <article>
          <small>{t("partnerOffers")}</small>
          <h2>{t("partnerUnavailable")}</h2>
        </article>
      </section>
    </div>
  );
}

function GuidedStep({
  step,
  update,
}: {
  step: number;
  update: (field: keyof TripDraft, value: unknown) => void;
}) {
  const { t, locale } = useI18n();
  const { trip } = useTrip();
  if (step === 0)
    return (
      <div className="form-section">
        <h2>{t("trip")}</h2>
        <div className="form-grid-new">
          <label>
            {t("destination")}
            <select
              value={trip.destination}
              onChange={(event) => update("destination", event.target.value)}
            >
              <option value="">—</option>
              {places.map((place) => (
                <option value={place.slug} key={place.slug}>
                  {place.name[locale]}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t("dates")}
            <span className="date-pair">
              <input
                type="date"
                value={trip.startDate}
                onChange={(event) => update("startDate", event.target.value)}
              />
              <input
                type="date"
                value={trip.endDate}
                onChange={(event) => update("endDate", event.target.value)}
              />
            </span>
          </label>
          <label>
            {t("travellers")}
            <input
              type="number"
              min="1"
              max="30"
              value={trip.travellers}
              onChange={(event) =>
                update("travellers", Number(event.target.value))
              }
            />
          </label>
          <label>
            {t("departure")}
            <input
              value={trip.departure}
              onChange={(event) => update("departure", event.target.value)}
            />
          </label>
          <label>
            {t("budget")}
            <input
              inputMode="decimal"
              value={trip.budget}
              onChange={(event) => update("budget", event.target.value)}
            />
          </label>
        </div>
      </div>
    );
  if (step === 4) return <FreePlanner />;
  if (step === 6) return null;
  const key = stepKeys[step];
  return (
    <div className="form-section">
      <h2>{t(key)}</h2>
      <p>
        {step === 1
          ? t("directUnavailable")
          : step === 2 || step === 3
            ? t("partnerUnavailable")
            : t("practical")}
      </p>
      <label className="notes-field">
        {t("notes")}
        <textarea
          value={trip.notes}
          onChange={(event) => update("notes", event.target.value)}
          rows={7}
        />
      </label>
    </div>
  );
}

function FreePlanner() {
  const { t, locale } = useI18n();
  const { trip, setTrip } = useTrip();
  const used = new Set(
    trip.days.flatMap((day) => day.steps.map((step) => step.placeSlug)),
  );
  return (
    <div className="form-section">
      <h2>{t("addPlace")}</h2>
      <div className="place-picker">
        {places.map((place) => (
          <button
            key={place.slug}
            disabled={used.has(place.slug)}
            onClick={() =>
              setTrip((current) => addPlaceToTrip(current, place.slug))
            }
          >
            <img src={place.image} alt="" loading="lazy" />
            <span>{place.name[locale]}</span>
            {used.has(place.slug) ? (
              <Check aria-hidden="true" />
            ) : (
              <Plus aria-hidden="true" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function Journal({
  view,
  setView,
  moveStep,
  removeStep,
  addDay,
  exportPdf,
  setShareMessage,
}: {
  view: "simple" | "detailed";
  setView: (value: "simple" | "detailed") => void;
  moveStep: (day: number, item: number, direction: -1 | 1) => void;
  removeStep: (day: number, id: string) => void;
  addDay: () => void;
  exportPdf: () => Promise<void>;
  setShareMessage: (message: string) => void;
}) {
  const { t, locale } = useI18n();
  const { trip } = useTrip();
  return (
    <div className="journal">
      <header>
        <h2>{t("summary")}</h2>
        <div className="view-switch">
          <button
            className={view === "simple" ? "active" : ""}
            onClick={() => setView("simple")}
          >
            {t("simple")}
          </button>
          <button
            className={view === "detailed" ? "active" : ""}
            onClick={() => setView("detailed")}
          >
            {t("detailed")}
          </button>
        </div>
      </header>
      <ol>
        {trip.days.map((day: TripDay, dayIndex) => (
          <li key={day.id}>
            <h3>{day.title || `${t("trip")} ${dayIndex + 1}`}</h3>
            {!day.steps.length && <p>—</p>}
            <ul>
              {day.steps.map((item, itemIndex) => {
                const place = places.find(
                  (candidate) => candidate.slug === item.placeSlug,
                );
                return (
                  <li key={item.id}>
                    <span>
                      <strong>{place?.name[locale] || item.placeSlug}</strong>
                      {view === "detailed" && (
                        <small>
                          {place?.region} · {item.note || t("notes")}
                        </small>
                      )}
                    </span>
                    <span className="row-actions">
                      <button
                        onClick={() => moveStep(dayIndex, itemIndex, -1)}
                        disabled={itemIndex === 0}
                        aria-label={t("previous")}
                      >
                        <ArrowUp aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => moveStep(dayIndex, itemIndex, 1)}
                        disabled={itemIndex === day.steps.length - 1}
                        aria-label={t("next")}
                      >
                        <ArrowDown aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => removeStep(dayIndex, item.id)}
                      aria-label={t('reset')}
                      >
                        <Trash2 aria-hidden="true" />
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
      <div className="journal-actions">
        <button className="secondary-action" onClick={addDay}>
          <Plus aria-hidden="true" />
          {t("addDay")}
        </button>
        <button className="secondary-action" onClick={exportPdf}>
          <FileDown aria-hidden="true" />
          {t("exportPdf")}
        </button>
        <button
          className="secondary-action"
          onClick={() => setShareMessage(t("shareUnavailable"))}
        >
          <Link2 aria-hidden="true" />
          {t("privateShare")}
        </button>
      </div>
    </div>
  );
}
