
import { useEffect, useState, useCallback, type FormEvent } from "react";
import axios from "axios";
import {
  AlertTriangle,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  CalendarDays,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const API = `${import.meta.env.VITE_API_URL || "http://localhost:3001"}/api/driftsmeldinger`;

interface Melding {
  id: number;
  tittel: string;
  melding: string;
  createdAt: string;
}

const localeMap = {
  no: "no-NO",
  en: "en-GB",
  ru: "ru-RU",
  uk: "uk-UA",
} as const;

export function AdminPanel() {
  const { language, t } = useLanguage();
  const locale = localeMap[language];

  const [meldinger, setMeldinger] = useState<Melding[]>([]);
  const [tittel, setTittel] = useState("");
  const [melding, setMelding] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

    const fetchMeldinger = useCallback(async () => {
    try {
      const response = await axios.get(API);

      setMeldinger(
        Array.isArray(response.data) ? response.data : []
      );

      setError("");
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError(t("fetchError"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    let isMounted = true;

    const loadMessages = async () => {
      try {
        const response = await axios.get(API);

        if (!isMounted) return;

        setMeldinger(
          Array.isArray(response.data) ? response.data : []
        );

        setError("");
      } catch (error) {
        if (!isMounted) return;

        console.error("Error fetching messages:", error);
        setError(t("fetchError"));
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadMessages();

    return () => {
      isMounted = false;
    };
  }, [t]);

  const resetForm = () => {
    setEditId(null);
    setTittel("");
    setMelding("");
    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!tittel.trim() || !melding.trim()) {
      setError(t("fillFields"));
      return;
    }

    setSaving(true);
    setError("");

    try {
      if (editId !== null) {
        await axios.put(`${API}/${editId}`, {
          tittel: tittel.trim(),
          melding: melding.trim(),
        });
      } else {
        await axios.post(API, {
          tittel: tittel.trim(),
          melding: melding.trim(),
        });
      }

      resetForm();
      await fetchMeldinger();
    } catch (error) {
      console.error("Error saving message:", error);
      setError(t("saveError"));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (m: Melding) => {
    setEditId(m.id);
    setTittel(m.tittel);
    setMelding(m.melding);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(t("deleteConfirmation"));

    if (!confirmed) return;

    try {
      await axios.delete(`${API}/${id}`);
      await fetchMeldinger();

      if (editId === id) {
        resetForm();
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      setError(t("deleteError"));
    }
  };

  return (
    <main className="page-container admin-page animate-fade-in">
      <section className="admin-hero">
        <div>
          <div className="eyebrow">
            <span className="status-dot" />
            {t("managementSystem")}
          </div>

          <h1>
            {t("adminTitle").split(" ")[0]}
            <span className="gradient-text">
              {t("adminTitle").split(" ").slice(1).join(" ")}
            </span>
          </h1>

          <p className="hero-description">
            {t("adminDescription")}
          </p>
        </div>

        <div className="admin-hero-icon">
          <ClipboardList size={38} />
        </div>
      </section>

      <section className="admin-summary">
        <div className="stat-card glass">
          <div className="stat-icon warning-icon">
            <AlertTriangle size={20} />
          </div>
          <div>
            <span className="stat-label">{t("totalMessages")}</span>
            <strong>{meldinger.length}</strong>
          </div>
          <span className="stat-caption">{t("registeredUpdates")}</span>
        </div>

        <div className="stat-card glass">
          <div className="stat-icon live-icon">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span className="stat-label">{t("status")}</span>
            <strong className="online-status">{t("ready")}</strong>
          </div>
          <span className="stat-caption">{t("adminPanel")}</span>
        </div>
      </section>

      <section className="admin-form-section glass">
        <div className="admin-section-heading">
          <div className="section-heading-icon warning-icon">
            {editId !== null ? <Pencil size={20} /> : <Plus size={21} />}
          </div>

          <div>
            <h2>
              {editId !== null ? t("editMessage") : t("newMessage")}
            </h2>
            <p>
              {editId !== null
                ? t("updateInformation")
                : t("createInformation")}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          <label htmlFor="message-title">{t("title")}</label>
          <input
            id="message-title"
            type="text"
            placeholder={t("enterTitle")}
            value={tittel}
            onChange={(event) => setTittel(event.target.value)}
            maxLength={150}
            required
          />

          <label htmlFor="message-content">{t("message")}</label>
          <textarea
            id="message-content"
            placeholder={t("enterMessage")}
            value={melding}
            onChange={(event) => setMelding(event.target.value)}
            rows={5}
            required
          />

          {error && <div className="form-error">{error}</div>}

          <div className="form-actions">
            <button
              type="submit"
              className="primary-button"
              disabled={saving}
            >
              {saving ? (
                <span className="loading-spinner small-spinner" />
              ) : editId !== null ? (
                <Save size={17} />
              ) : (
                <Plus size={18} />
              )}

              {saving
                ? t("saving")
                : editId !== null
                  ? t("saveChanges")
                  : t("addMessage")}
            </button>

            {editId !== null && (
              <button
                type="button"
                className="secondary-button"
                onClick={resetForm}
              >
                <X size={17} />
                {t("cancel")}
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="admin-messages-section">
        <div className="section-heading">
          <div className="section-heading-icon warning-icon">
            <ClipboardList size={21} />
          </div>
          <div>
            <h2>{t("activeMessages")}</h2>
            <p>{t("publishedMessages")}</p>
          </div>
          <span className="section-count">{meldinger.length}</span>
        </div>

        {loading ? (
          <div className="empty-state glass">
            <div className="loading-spinner" />
            <p>{t("fetchingMessages")}</p>
          </div>
        ) : meldinger.length === 0 ? (
          <div className="empty-state glass">
            <div className="empty-icon">
              <ClipboardList size={25} />
            </div>
            <h3>{t("noMessagesYet")}</h3>
            <p>{t("createFirstMessage")}</p>
          </div>
        ) : (
          <div className="admin-message-list">
            {meldinger.map((m) => (
              <article className="admin-message-card glass" key={m.id}>
                <div className="admin-message-content">
                  <span className="message-badge">
                    <AlertTriangle size={13} />
                    {t("operationalMessage")}
                  </span>

                  <h3>{m.tittel}</h3>
                  <p>{m.melding}</p>

                  <span className="admin-message-date">
                    <CalendarDays size={14} />
                    {new Date(m.createdAt).toLocaleDateString(locale)}
                  </span>
                </div>

                <div className="admin-message-actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(m)}
                    title={t("edit")}
                  >
                    <Pencil size={16} />
                    {t("edit")}
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(m.id)}
                    title={t("delete")}
                  >
                    <Trash2 size={16} />
                    {t("delete")}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
