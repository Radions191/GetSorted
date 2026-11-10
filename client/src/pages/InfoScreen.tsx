
import { useEffect, useState } from "react";
import axios from "axios";
import {
  AlertTriangle,
  Newspaper,
  Clock,
  CalendarDays,
  MessageCircle,
  ExternalLink,
  TrendingUp,
  Activity,
  Radio,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface NewsItem {
  id: number;
  title: string;
  by: string;
  time: number;
  url?: string;
  score: number;
  descendants?: number;
}

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

export function InfoScreen() {
  const { language, t } = useLanguage();

  const [news, setNews] = useState<NewsItem[]>([]);
  const [meldinger, setMeldinger] = useState<Melding[]>([]);
  const [time, setTime] = useState(new Date());
  const [newsLoading, setNewsLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(true);

  const locale = localeMap[language];

  useEffect(() => {
    axios
      .get(`${API_URL}/api/news`)
      .then((response) => {
        setNews(
          Array.isArray(response.data)
            ? response.data.filter(Boolean)
            : []
        );
      })
      .catch((error) => {
        console.error("News loading error:", error);
        setNews([]);
      })
      .finally(() => setNewsLoading(false));

    axios
      .get(`${API_URL}/api/driftsmeldinger`)
      .then((response) => {
        setMeldinger(
          Array.isArray(response.data) ? response.data : []
        );
      })
      .catch((error) => {
        console.error("Driftsmeldinger loading error:", error);
        setMeldinger([]);
      })
      .finally(() => setMessagesLoading(false));

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="page-container animate-fade-in">
      <section className="hero-section">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="status-dot" />
            {t("liveInformation")}
          </div>

          <h1>
            {t("welcome")} <span className="gradient-text">GetSorted.</span>
          </h1>

          <p className="hero-description">
            {t("heroDescription")}
          </p>

          <div className="hero-meta">
            <span>
              <Activity size={15} />
              {t("systemOverview")}
            </span>
            <span>
              <Radio size={15} />
              {t("liveDashboard")}
            </span>
          </div>
        </div>

        <div className="clock-card glass">
          <div className="clock-top">
            <span className="clock-label">{t("currentTime")}</span>
            <Clock size={18} />
          </div>

          <div className="clock-time">
            {time.toLocaleTimeString(locale)}
          </div>

          <div className="clock-date">
            <CalendarDays size={15} />
            {time.toLocaleDateString(locale, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </section>

      <section className="dashboard-stats">
        <div className="stat-card glass">
          <div className="stat-icon warning-icon">
            <AlertTriangle size={20} />
          </div>
          <div>
            <span className="stat-label">{t("operationalMessages")}</span>
            <strong>{meldinger.length}</strong>
          </div>
          <span className="stat-caption">{t("importantInformation")}</span>
        </div>

        <div className="stat-card glass">
          <div className="stat-icon news-icon">
            <Newspaper size={20} />
          </div>
          <div>
            <span className="stat-label">{t("news")}</span>
            <strong>{news.length}</strong>
          </div>
          <span className="stat-caption">{t("latestStories")}</span>
        </div>

        <div className="stat-card glass">
          <div className="stat-icon live-icon">
            <Radio size={20} />
          </div>
          <div>
            <span className="stat-label">{t("status")}</span>
            <strong className="online-status">{t("online")}</strong>
          </div>
          <span className="stat-caption">{t("dashboardActive")}</span>
        </div>
      </section>

      <section className="content-grid">
        <div className="content-section">
          <div className="section-heading">
            <div className="section-heading-icon warning-icon">
              <AlertTriangle size={21} />
            </div>
            <div>
              <h2>{t("operationalMessages")}</h2>
              <p>{t("importantInformation")}</p>
            </div>
            <span className="section-count">{meldinger.length}</span>
          </div>

          {messagesLoading ? (
            <div className="empty-state glass">
              <div className="loading-spinner" />
              <p>{t("loadingMessages")}</p>
            </div>
          ) : meldinger.length === 0 ? (
            <div className="empty-state glass">
              <div className="empty-icon success-icon">
                <Activity size={25} />
              </div>
              <h3>{t("everythingWorks")}</h3>
              <p>{t("noActiveMessages")}</p>
            </div>
          ) : (
            <div className="message-list">
              {meldinger.map((m) => (
                <article className="message-card glass" key={m.id}>
                  <div className="message-card-top">
                    <span className="message-badge">
                      <AlertTriangle size={13} />
                      {t("operationalMessage")}
                    </span>
                    <span className="message-date">
                      {new Date(m.createdAt).toLocaleDateString(locale)}
                    </span>
                  </div>

                  <h3>{m.tittel}</h3>
                  <p>{m.melding}</p>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="content-section">
          <div className="section-heading">
            <div className="section-heading-icon news-icon">
              <Newspaper size={21} />
            </div>
            <div>
              <h2>{t("news")}</h2>
              <p>{t("latestTechnologyNews")}</p>
            </div>
            <span className="section-count">{news.length}</span>
          </div>

          {newsLoading ? (
            <div className="empty-state glass">
              <div className="loading-spinner" />
              <p>{t("loadingNews")}</p>
            </div>
          ) : news.length === 0 ? (
            <div className="empty-state glass">
              <div className="empty-icon">
                <Newspaper size={25} />
              </div>
              <h3>{t("noNews")}</h3>
              <p>{t("newsWillAppear")}</p>
            </div>
          ) : (
            <div className="news-list">
              {news.map((n) => (
                <article className="news-card glass" key={n.id}>
                  <div className="news-card-top">
                    <span className="news-source">
                      <TrendingUp size={14} />
                      HACKER NEWS
                    </span>
                    <span className="news-score">
                      {n.score} {t("points")}
                    </span>
                  </div>

                  <h3>{n.title}</h3>

                  <p className="news-author">
                    {t("author")} <strong>{n.by}</strong>
                  </p>

                  <div className="news-footer">
                    <span>
                      <CalendarDays size={14} />
                      {new Date(n.time * 1000).toLocaleDateString(locale)}
                    </span>
                    <span>
                      <MessageCircle size={14} />
                      {n.descendants ?? 0} {t("comments")}
                    </span>
                  </div>

                  {n.url && (
                    <a
                      className="news-link"
                      href={n.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("readArticle")}
                      <ExternalLink size={15} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="dashboard-footer">
        <span>© {time.getFullYear()} GetSorted AS</span>
        <span>{t("poweredBy")}</span>
      </footer>
    </main>
  );
}
