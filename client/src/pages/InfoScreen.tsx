import { useState, type FormEvent } from "react";
import { useLanguage } from "../context/LanguageContext";

const storageKey = "getsorted-notes-v1";
const statuses = ["issue", "planned", "resolved"] as const;
type Status = (typeof statuses)[number];
type Filter = "all" | Status;

interface Note {
  id: string;
  title: string;
  body: string;
  status: Status;
  updatedAt: string;
}

const copy = {
  no: { board: "Arbeidsnotater", local: "Notatene lagres i denne nettleseren.", add: "Legg til notat", status: "Status", all: "Alle", issue: "Problem", planned: "Planlagt", resolved: "Løst", empty: "Ingen notater i denne visningen.", failed: "Kunne ikke åpne de lagrede notatene." },
  en: { board: "Work notes", local: "Notes are saved in this browser.", add: "Add note", status: "Status", all: "All", issue: "Issue", planned: "Planned", resolved: "Resolved", empty: "No notes in this view.", failed: "Could not open saved notes." },
  ru: { board: "Рабочие заметки", local: "Заметки сохраняются в этом браузере.", add: "Добавить заметку", status: "Статус", all: "Все", issue: "Проблема", planned: "Запланировано", resolved: "Решено", empty: "Здесь пока нет заметок.", failed: "Не удалось открыть сохранённые заметки." },
  uk: { board: "Робочі нотатки", local: "Нотатки зберігаються в цьому браузері.", add: "Додати нотатку", status: "Статус", all: "Усі", issue: "Проблема", planned: "Заплановано", resolved: "Вирішено", empty: "Тут поки немає нотаток.", failed: "Не вдалося відкрити збережені нотатки." },
};

const locale = { no: "nb-NO", en: "en-GB", ru: "ru-RU", uk: "uk-UA" };
const emptyDraft = { id: "", title: "", body: "", status: "issue" as Status };

function isStatus(value: unknown): value is Status {
  return statuses.some((status) => status === value);
}

function isNote(value: unknown): value is Note {
  if (typeof value !== "object" || value === null) return false;
  const note = value as Partial<Note>;
  return typeof note.id === "string" &&
    typeof note.title === "string" &&
    typeof note.body === "string" &&
    isStatus(note.status) &&
    typeof note.updatedAt === "string" &&
    Number.isFinite(Date.parse(note.updatedAt));
}

function readNotes(): Note[] {
  const raw = localStorage.getItem(storageKey);
  if (raw === null) return [];
  const value: unknown = JSON.parse(raw);
  if (Array.isArray(value) && value.every(isNote)) return value;
  throw new Error("Invalid saved notes");
}

function loadNotes(): Note[] | null {
  try {
    return readNotes();
  } catch {
    return null;
  }
}

export function InfoScreen() {
  const { language, t } = useLanguage();
  const labels = copy[language];
  const [notes, setNotes] = useState(loadNotes);
  const [filter, setFilter] = useState<Filter>("all");
  const [draft, setDraft] = useState<typeof emptyDraft | null>(null);
  const [error, setError] = useState<"fillFields" | "saveError" | null>(null);
  const visible = notes?.filter((note) => filter === "all" || note.status === filter);

  function openDraft(note = emptyDraft) {
    setError(null);
    setDraft(note);
  }

  function saveNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft) return;

    const title = draft.title.trim();
    const body = draft.body.trim();
    if (!title || !body) {
      setError("fillFields");
      return;
    }

    try {
      const note = {
        ...draft,
        id: draft.id || crypto.randomUUID(),
        title,
        body,
        updatedAt: new Date().toISOString(),
      };
      const next = [note, ...readNotes().filter((entry) => entry.id !== note.id)];
      localStorage.setItem(storageKey, JSON.stringify(next));
      setNotes(next);
      setFilter("all");
      setDraft(null);
      setError(null);
    } catch {
      setError("saveError");
    }
  }

  return (
    <main className="page-container animate-fade-in">
      <section className="hero-section">
        <div className="hero-content">
          <h1>{labels.board}</h1>
          <p className="hero-description">{labels.local}</p>
          {notes && !draft && (
            <button type="button" className="primary-button" onClick={() => openDraft()}>
              {labels.add}
            </button>
          )}
        </div>
      </section>

      {notes === null && <p role="alert">{labels.failed}</p>}
      {draft && (
        <section className="admin-form-section glass">
          <h2>{draft.id ? t("edit") : labels.add}</h2>
          <form className="admin-form" onSubmit={saveNote}>
            <label htmlFor="note-title">{t("title")}</label>
            <input id="note-title" value={draft.title} required maxLength={120}
              onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
            <label htmlFor="note-body">{t("message")}</label>
            <textarea id="note-body" value={draft.body} required maxLength={3000}
              onChange={(event) => setDraft({ ...draft, body: event.target.value })} />
            <label htmlFor="note-status">{labels.status}</label>
            <select id="note-status" className="secondary-button" value={draft.status}
              onChange={(event) => {
                const status = event.target.value;
                if (isStatus(status)) setDraft({ ...draft, status });
              }}>
              {statuses.map((status) => <option key={status} value={status}>{labels[status]}</option>)}
            </select>
            {error && <p role="alert" className="form-error">{t(error)}</p>}
            <div className="form-actions">
              <button type="submit" className="primary-button">{t("saveChanges")}</button>
              <button type="button" className="secondary-button" onClick={() => setDraft(null)}>
                {t("cancel")}
              </button>
            </div>
          </form>
        </section>
      )}

      {visible && (
        <section className="message-list" aria-label={labels.board}>
          <div className="form-actions" role="group" aria-label={labels.status} style={{ flexWrap: "wrap" }}>
            {(["all", ...statuses] as const).map((status) => (
              <button key={status} type="button" aria-pressed={filter === status}
                className={filter === status ? "primary-button" : "secondary-button"}
                onClick={() => setFilter(status)}>
                {labels[status]}
              </button>
            ))}
          </div>
          {visible.length === 0 && <p className="empty-state">{labels.empty}</p>}
          {visible.map((note) => (
            <article className="message-card glass" key={note.id}>
              <div className="message-card-top">
                <span className="message-badge">{labels[note.status]}</span>
                <time className="message-date" dateTime={note.updatedAt}>
                  {new Date(note.updatedAt).toLocaleString(locale[language], {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </time>
              </div>
              <h3 style={{ overflowWrap: "anywhere" }}>{note.title}</h3>
              <p style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{note.body}</p>
              <button type="button" className="edit-button" disabled={draft !== null}
                onClick={() => openDraft(note)}>
                {t("edit")}
              </button>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
