import { Bell, Database, Globe2, LockKeyhole, WalletCards } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n, type Locale } from "../i18n";
import { useTrip } from "../lib/trip";

export default function Profile() {
  const { t, locale, setLocale, localeNames } = useI18n();
  const { trip } = useTrip();
  const [message, setMessage] = useState("");
  const unavailable = (event: FormEvent) => {
    event.preventDefault();
    setMessage(t("authUnavailable"));
  };
  return (
    <div className="profile-page">
      <section className="profile-intro">
        <p className="eyebrow">VoyageGo ID</p>
        <h1>{t("accountTitle")}</h1>
        <p>{t("accountLead")}</p>
      </section>
      <div className="profile-layout">
        <section className="auth-card">
          <LockKeyhole aria-hidden="true" />
          <h2>{t("signIn")}</h2>
          <form onSubmit={unavailable}>
            <label>
              {t("email")}
              <input type="email" autoComplete="email" required />
            </label>
            <label>
              {t("password")}
              <input type="password" autoComplete="current-password" required />
            </label>
            <button className="primary-action" type="submit">
              {t("signIn")}
            </button>
            <button
              className="text-button"
              type="button"
              onClick={() => setMessage(t("authUnavailable"))}
            >
              {t("forgot")}
            </button>
          </form>
          {message && (
            <p className="inline-notice" role="status">
              {message}
            </p>
          )}
        </section>
        <section className="profile-content">
          <article className="active-trip">
            <small>{t("trip")}</small>
            <h2>{trip.title || t("trip")}</h2>
            <p>
              {trip.destination || t("destination")} · {trip.days.length}{" "}
              {t("activities")}
            </p>
            <Link to="/prepare">{t("summary")}</Link>
          </article>
          <div className="settings-list">
            <label>
              <Globe2 aria-hidden="true" />
              <span>
                <strong>{t("language")}</strong>
                <small>{localeNames[locale]}</small>
              </span>
              <select
                value={locale}
                onChange={(event) => setLocale(event.target.value as Locale)}
              >
                {Object.entries(localeNames).map(([key, name]) => (
                  <option value={key} key={key}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <WalletCards aria-hidden="true" />
              <span>
                <strong>{t("currency")}</strong>
                <small>MAD</small>
              </span>
              <select defaultValue="MAD">
                <option>MAD</option>
                <option disabled>EUR — API</option>
                <option disabled>USD — API</option>
              </select>
            </label>
            <div>
              <Bell aria-hidden="true" />
              <span>
                <strong>{t("notifications")}</strong>
                <small>{t("authUnavailable")}</small>
              </span>
            </div>
            <div>
              <Database aria-hidden="true" />
              <span>
                <strong>{t("privacy")}</strong>
                <small>{t("saved")}</small>
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
