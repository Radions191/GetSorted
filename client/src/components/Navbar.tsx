import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Monitor,
  Settings,
  Sun,
  Moon,
  Palette,
  ChevronDown,
  X,
  Languages,
  Check,
} from "lucide-react";

import { useTheme, type ThemeColors } from "../context/ThemeContext";
import { useLanguage, type Language } from "../context/LanguageContext";

const colorOptions: {
  key: keyof ThemeColors;
  label: string;
}[] = [
  { key: "background", label: "backgroundColor" },
  { key: "surface", label: "surfaceColor" },
  { key: "card", label: "cardColor" },
  { key: "text", label: "textColor" },
  { key: "muted", label: "mutedColor" },
  { key: "accent", label: "accentColor" },
  { key: "accentSecondary", label: "secondaryAccent" },
];

const languages: { value: Language; label: string }[] = [
  { value: "no", label: "🇳🇴 Norsk" },
  { value: "en", label: "🇬🇧 English" },
  { value: "ru", label: "🇷🇺 Русский" },
  { value: "uk", label: "🇺🇦 Українська" },
];

export function Navbar() {
  const { mode, colors, setMode, updateColor } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const selectedLanguage =
    languages.find((item) => item.value === language) ?? languages[0];

  const selectLanguage = (value: Language) => {
    setLanguage(value);
    setLanguageOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          <div className="brand-icon">
            <Monitor size={22} />
          </div>

          <div>
            <span className="brand-name">GetSorted</span>
            <span className="brand-subtitle">
              AS · Information system
            </span>
          </div>
        </NavLink>

        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <Monitor size={17} />
            <span>{t("navigationScreen")}</span>
          </NavLink>

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <Settings size={17} />
            <span>{t("navigationAdmin")}</span>
          </NavLink>
        </nav>

        <div className="navbar-controls">
          {/* LANGUAGE SELECTOR */}
          <div className="language-area">
            <button
              type="button"
              className="language-control-button"
              onClick={() => {
                setLanguageOpen(!languageOpen);
                setSettingsOpen(false);
              }}
              aria-label={t("language")}
              aria-expanded={languageOpen}
            >
              <Languages size={18} />
              <span>{selectedLanguage.label}</span>
              <ChevronDown
                size={15}
                className={languageOpen ? "rotate-icon" : ""}
              />
            </button>

            {languageOpen && (
              <>
                <button
                  type="button"
                  className="language-menu-backdrop"
                  aria-label="Close language menu"
                  onClick={() => setLanguageOpen(false)}
                />

                <div className="language-menu">
                  <div className="language-menu-heading">
                    {t("language")}
                  </div>

                  {languages.map((item) => (
                    <button
                      type="button"
                      key={item.value}
                      className={`language-option ${
                        language === item.value ? "selected" : ""
                      }`}
                      onClick={() => selectLanguage(item.value)}
                    >
                      <span>{item.label}</span>

                      {language === item.value && (
                        <Check size={17} />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* THEME SELECTOR */}
          <div className="theme-area">
            <button
              type="button"
              className="theme-button"
              onClick={() => {
                setSettingsOpen(!settingsOpen);
                setLanguageOpen(false);
              }}
              aria-expanded={settingsOpen}
            >
              {mode === "light" ? (
                <Sun size={18} />
              ) : mode === "custom" ? (
                <Palette size={18} />
              ) : (
                <Moon size={18} />
              )}

              <span>{t("theme")}</span>

              <ChevronDown
                size={15}
                className={settingsOpen ? "rotate-icon" : ""}
              />
            </button>

            {settingsOpen && (
              <>
                <button
                  type="button"
                  className="popover-backdrop"
                  aria-label="Close theme settings"
                  onClick={() => setSettingsOpen(false)}
                />

                <div className="theme-popover">
                  <div className="popover-heading">
                    <div>
                      <strong>{t("appearance")}</strong>
                      <p>{t("customizeScreen")}</p>
                    </div>

                    <button
                      type="button"
                      className="icon-button"
                      onClick={() => setSettingsOpen(false)}
                      aria-label="Close"
                    >
                      <X size={17} />
                    </button>
                  </div>

                  <div className="theme-presets">
                    <button
                      type="button"
                      className={`theme-preset ${
                        mode === "dark" ? "selected" : ""
                      }`}
                      onClick={() => setMode("dark")}
                    >
                      <Moon size={19} />
                      <span>{t("dark")}</span>
                    </button>

                    <button
                      type="button"
                      className={`theme-preset ${
                        mode === "light" ? "selected" : ""
                      }`}
                      onClick={() => setMode("light")}
                    >
                      <Sun size={19} />
                      <span>{t("light")}</span>
                    </button>

                    <button
                      type="button"
                      className={`theme-preset ${
                        mode === "custom" ? "selected" : ""
                      }`}
                      onClick={() => setMode("custom")}
                    >
                      <Palette size={19} />
                      <span>{t("custom")}</span>
                    </button>
                  </div>

                  {mode === "custom" && (
                    <div className="custom-colors">
                      <div className="custom-colors-title">
                        {t("ownColors")}
                      </div>

                      {colorOptions.map((option) => (
                        <label className="color-row" key={option.key}>
                          <span>{t(option.label)}</span>

                          <input
                            type="color"
                            value={colors[option.key]}
                            onChange={(event) =>
                              updateColor(
                                option.key,
                                event.target.value
                              )
                            }
                          />
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}