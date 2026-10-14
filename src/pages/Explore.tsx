import { Compass, LocateFixed, MapPin, Search, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapCanvas } from "../components/MapCanvas";
import { places } from "../data/places";
import { useI18n } from "../i18n";

export default function Explore() {
  const { t, locale } = useI18n();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(places[0].slug);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null,
  );
  const [geoMessage, setGeoMessage] = useState("");
  const filtered = useMemo(
    () =>
      places.filter((place) =>
        `${place.name[locale]} ${place.region} ${place.tags.join(" ")}`
          .toLocaleLowerCase(locale)
          .includes(query.toLocaleLowerCase(locale)),
      ),
    [query, locale],
  );
  const onSelect = useCallback((slug: string) => setSelected(slug), []);
  const active = places.find((place) => place.slug === selected) || places[0];
  const locate = () => {
    if (!navigator.geolocation) return setGeoMessage(t("locationDenied"));
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserPosition([coords.latitude, coords.longitude]);
        setGeoMessage("");
      },
      () => setGeoMessage(t("locationDenied")),
      { enableHighAccuracy: false, timeout: 8000 },
    );
  };

  return (
    <div className="explore-page">
      <section className="explore-intro">
        <p className="eyebrow">
          <Compass aria-hidden="true" /> MarocoGO
        </p>
        <h1>{t("exploreTitle")}</h1>
        <p>{t("exploreLead")}</p>
      </section>
      <section className="explore-workspace">
        <aside className="place-results" aria-label={t("search")}>
          <label className="search-control">
            <Search aria-hidden="true" />
            <span className="sr-only">{t("search")}</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("search")}
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label={t("reset")}>
                <X aria-hidden="true" />
              </button>
            )}
          </label>
          <button className="location-action" onClick={locate}>
            <LocateFixed aria-hidden="true" />
            {t("locate")}
          </button>
          {geoMessage && (
            <p className="inline-notice" role="status">
              {geoMessage}
            </p>
          )}
          <ul>
            {filtered.map((place) => (
              <li key={place.slug}>
                <button
                  className={selected === place.slug ? "selected" : ""}
                  onClick={() => setSelected(place.slug)}
                >
                  <img src={place.image} alt="" loading="lazy" />
                  <span>
                    <strong>{place.name[locale]}</strong>
                    <small>
                      <MapPin aria-hidden="true" />
                      {place.region}
                    </small>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div className="map-panel">
          <MapCanvas
            places={filtered.length ? filtered : places}
            selected={selected}
            locale={locale}
            userPosition={userPosition}
          positionLabel={t("locate")}
            onSelect={onSelect}
          />
          <article className="map-place-card">
            <div>
              <small>{active.region}</small>
              <strong>{active.name[locale]}</strong>
              <span>{active.line[locale]}</span>
            </div>
            <Link to={`/place/${active.slug}`}>{t("heroCta")}</Link>
          </article>
        </div>
      </section>
      <p className="route-status">{t("routesUnavailable")}</p>
    </div>
  );
}
