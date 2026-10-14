import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  UserRoundCog,
} from "lucide-react";
import { useState } from "react";
import { useI18n, type TranslationKey } from "../i18n";

export default function Provider() {
  const { t } = useI18n();
  const [section, setSection] = useState<TranslationKey>("dashboard");
  const items = [
    { key: "dashboard" as const, icon: BarChart3 },
    { key: "services" as const, icon: BriefcaseBusiness },
    { key: "requests" as const, icon: ClipboardList },
    { key: "providerProfile" as const, icon: UserRoundCog },
  ];
  return (
    <div className="provider-page">
      <aside>
        <div className="provider-brand">
          <img src="/MarocoGO/logo/marocogo-symbol.png" alt="" />
          <span>MarocoGO Pro</span>
        </div>
        <nav aria-label={t("provider")}>
          {items.map(({ key, icon: Icon }) => (
            <button
              key={key}
              className={section === key ? "active" : ""}
              aria-label={t(key)}
              onClick={() => setSection(key)}
            >
              <Icon aria-hidden="true" />
              <span>{t(key)}</span>
            </button>
          ))}
        </nav>
      </aside>
      <section>
        <header>
          <div>
            <p className="eyebrow">MarocoGO Pro</p>
            <h1>{t("provider")}</h1>
            <p>{t("providerLead")}</p>
          </div>
          <span className="demo-badge">{t("previewData")}</span>
        </header>
        <div className="provider-surface">
          <Building2 aria-hidden="true" />
          <h2>{t(section)}</h2>
          <p>{section === "requests" ? t("noRequests") : t("providerLead")}</p>
          {section === "providerProfile" && (
            <form className="provider-form">
              <label>
                {t("providerProfile")}
                <input disabled placeholder={t("providerLead")} />
              </label>
              <label>
                {t("services")}
                <select disabled>
                  <option>{t("provider")}</option>
                </select>
              </label>
              <button className="primary-action" disabled>
                {t("save")}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
