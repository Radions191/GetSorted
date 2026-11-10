
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
/* eslint-disable react-refresh/only-export-components */
export type Language = "no" | "en" | "ru" | "uk";

const translations: Record<string, Record<Language, string>> = {
  navigationScreen: {
    no: "Infoskjerm",
    en: "Information screen",
    ru: "Информационный экран",
    uk: "Інформаційний екран",
  },
  navigationAdmin: {
    no: "Adminpanel",
    en: "Admin panel",
    ru: "Админ-панель",
    uk: "Адмін-панель",
  },
  theme: {
    no: "Tema",
    en: "Theme",
    ru: "Тема",
    uk: "Тема",
  },
  appearance: {
    no: "Utseende",
    en: "Appearance",
    ru: "Внешний вид",
    uk: "Зовнішній вигляд",
  },
  customizeScreen: {
    no: "Tilpass skjermen din",
    en: "Customize your screen",
    ru: "Настройте внешний вид",
    uk: "Налаштуйте вигляд",
  },
  dark: {
    no: "Mørk",
    en: "Dark",
    ru: "Тёмная",
    uk: "Темна",
  },
  light: {
    no: "Lys",
    en: "Light",
    ru: "Светлая",
    uk: "Світла",
  },
  custom: {
    no: "Egendefinert",
    en: "Custom",
    ru: "Своя",
    uk: "Власна",
  },
  ownColors: {
    no: "Egne farger",
    en: "Custom colors",
    ru: "Свои цвета",
    uk: "Власні кольори",
  },
  backgroundColor: {
    no: "Sidebakgrunn",
    en: "Page background",
    ru: "Фон страницы",
    uk: "Фон сторінки",
  },
  surfaceColor: {
    no: "Overflate",
    en: "Surface",
    ru: "Поверхность",
    uk: "Поверхня",
  },
  cardColor: {
    no: "Kort",
    en: "Cards",
    ru: "Карточки",
    uk: "Картки",
  },
  textColor: {
    no: "Tekst",
    en: "Text",
    ru: "Текст",
    uk: "Текст",
  },
  mutedColor: {
    no: "Sekundær tekst",
    en: "Secondary text",
    ru: "Вторичный текст",
    uk: "Другорядний текст",
  },
  accentColor: {
    no: "Hovedfarge",
    en: "Main accent",
    ru: "Основной акцент",
    uk: "Основний акцент",
  },
  secondaryAccent: {
    no: "Sekundær aksent",
    en: "Secondary accent",
    ru: "Второй акцент",
    uk: "Другорядний акцент",
  },
  liveInformation: {
    no: "SANNTIDSINFORMASJON",
    en: "LIVE INFORMATION",
    ru: "ИНФОРМАЦИЯ В РЕАЛЬНОМ ВРЕМЕНИ",
    uk: "ІНФОРМАЦІЯ В РЕАЛЬНОМУ ЧАСІ",
  },
  welcome: {
    no: "Velkommen til",
    en: "Welcome to",
    ru: "Добро пожаловать в",
    uk: "Ласкаво просимо до",
  },
  heroDescription: {
    no: "Din sentrale oversikt over driftsmeldinger og teknologinyheter.",
    en: "Your central overview of operational updates and technology news.",
    ru: "Центральная панель с важными сообщениями и новостями технологий.",
    uk: "Центральна панель важливих повідомлень та технологічних новин.",
  },
  systemOverview: {
    no: "Systemoversikt",
    en: "System overview",
    ru: "Обзор системы",
    uk: "Огляд системи",
  },
  liveDashboard: {
    no: "Direkte oversikt",
    en: "Live dashboard",
    ru: "Панель в реальном времени",
    uk: "Панель у реальному часі",
  },
  currentTime: {
    no: "LOKAL TID",
    en: "CURRENT TIME",
    ru: "ТЕКУЩЕЕ ВРЕМЯ",
    uk: "ПОТОЧНИЙ ЧАС",
  },
  operationalMessages: {
    no: "Driftsmeldinger",
    en: "Operational updates",
    ru: "Системные сообщения",
    uk: "Системні повідомлення",
  },
  news: {
    no: "Nyheter",
    en: "News",
    ru: "Новости",
    uk: "Новини",
  },
  status: {
    no: "Status",
    en: "Status",
    ru: "Статус",
    uk: "Статус",
  },
  online: {
    no: "På nett",
    en: "Online",
    ru: "В сети",
    uk: "У мережі",
  },
  latestStories: {
    no: "Siste nyheter",
    en: "Latest stories",
    ru: "Последние новости",
    uk: "Останні новини",
  },
  dashboardActive: {
    no: "Skjermen er aktiv",
    en: "Dashboard active",
    ru: "Панель активна",
    uk: "Панель активна",
  },
  importantInformation: {
    no: "Viktig driftsinformasjon",
    en: "Important operational information",
    ru: "Важная информация о работе системы",
    uk: "Важлива інформація про роботу системи",
  },
  latestTechnologyNews: {
    no: "Siste teknologinyheter fra Hacker News",
    en: "Latest technology news from Hacker News",
    ru: "Последние технологические новости Hacker News",
    uk: "Останні технологічні новини Hacker News",
  },
  loadingMessages: {
    no: "Laster meldinger...",
    en: "Loading messages...",
    ru: "Загрузка сообщений...",
    uk: "Завантаження повідомлень...",
  },
  loadingNews: {
    no: "Laster nyheter...",
    en: "Loading news...",
    ru: "Загрузка новостей...",
    uk: "Завантаження новин...",
  },
  everythingWorks: {
    no: "Alt fungerer som det skal",
    en: "Everything is working",
    ru: "Всё работает нормально",
    uk: "Усе працює належним чином",
  },
  noActiveMessages: {
    no: "Ingen aktive driftsmeldinger akkurat nå.",
    en: "No active operational messages right now.",
    ru: "Сейчас нет активных системных сообщений.",
    uk: "Зараз немає активних системних повідомлень.",
  },
  noNews: {
    no: "Ingen nyheter tilgjengelig",
    en: "No news available",
    ru: "Нет доступных новостей",
    uk: "Немає доступних новин",
  },
  newsWillAppear: {
    no: "Nyheter vises her når de er tilgjengelige.",
    en: "News stories will appear here when available.",
    ru: "Здесь будут появляться доступные новости.",
    uk: "Тут з'являтимуться доступні новини.",
  },
  operationalMessage: {
    no: "DRIFTSMELDING",
    en: "OPERATIONAL UPDATE",
    ru: "СИСТЕМНОЕ СООБЩЕНИЕ",
    uk: "СИСТЕМНЕ ПОВІДОМЛЕННЯ",
  },
  author: {
    no: "Av",
    en: "By",
    ru: "Автор",
    uk: "Автор",
  },
  points: {
    no: "poeng",
    en: "points",
    ru: "баллов",
    uk: "балів",
  },
  comments: {
    no: "kommentarer",
    en: "comments",
    ru: "комментариев",
    uk: "коментарів",
  },
  readArticle: {
    no: "Les artikkelen",
    en: "Read article",
    ru: "Читать статью",
    uk: "Читати статтю",
  },
  poweredBy: {
    no: "Drevet av GetSorted informasjonssystem",
    en: "Powered by GetSorted Information System",
    ru: "Работает на информационной системе GetSorted",
    uk: "Працює на інформаційній системі GetSorted",
  },
  managementSystem: {
    no: "ADMINISTRASJONSSYSTEM",
    en: "MANAGEMENT SYSTEM",
    ru: "СИСТЕМА УПРАВЛЕНИЯ",
    uk: "СИСТЕМА КЕРУВАННЯ",
  },
  adminTitle: {
    no: "Adminpanel",
    en: "Admin panel",
    ru: "Админ-панель",
    uk: "Адмін-панель",
  },
  adminDescription: {
    no: "Administrer driftsmeldinger og hold alle oppdatert.",
    en: "Manage operational updates and keep everyone informed.",
    ru: "Управляйте системными сообщениями и информируйте пользователей.",
    uk: "Керуйте системними повідомленнями та інформуйте користувачів.",
  },
  totalMessages: {
    no: "Totalt antall meldinger",
    en: "Total messages",
    ru: "Всего сообщений",
    uk: "Усього повідомлень",
  },
  registeredUpdates: {
    no: "Registrerte meldinger",
    en: "Registered updates",
    ru: "Зарегистрированные сообщения",
    uk: "Зареєстровані повідомлення",
  },
  ready: {
    no: "Klar",
    en: "Ready",
    ru: "Готово",
    uk: "Готово",
  },
  adminPanel: {
    no: "Administrasjonspanel",
    en: "Administration panel",
    ru: "Панель управления",
    uk: "Панель керування",
  },
  editMessage: {
    no: "Rediger melding",
    en: "Edit message",
    ru: "Редактировать сообщение",
    uk: "Редагувати повідомлення",
  },
  newMessage: {
    no: "Ny driftsmelding",
    en: "New operational update",
    ru: "Новое системное сообщение",
    uk: "Нове системне повідомлення",
  },
  updateInformation: {
    no: "Oppdater eksisterende informasjon",
    en: "Update existing information",
    ru: "Обновить существующую информацию",
    uk: "Оновити наявну інформацію",
  },
  createInformation: {
    no: "Opprett en ny melding til infoskjermen",
    en: "Create a new message for the information screen",
    ru: "Создать новое сообщение для информационного экрана",
    uk: "Створити нове повідомлення для інформаційного екрана",
  },
  title: {
    no: "Tittel",
    en: "Title",
    ru: "Заголовок",
    uk: "Заголовок",
  },
  message: {
    no: "Melding",
    en: "Message",
    ru: "Сообщение",
    uk: "Повідомлення",
  },
  enterTitle: {
    no: "Skriv inn tittel...",
    en: "Enter title...",
    ru: "Введите заголовок...",
    uk: "Введіть заголовок...",
  },
  enterMessage: {
    no: "Skriv inn driftsmeldingen...",
    en: "Enter your message...",
    ru: "Введите текст сообщения...",
    uk: "Введіть текст повідомлення...",
  },
  saving: {
    no: "Lagrer...",
    en: "Saving...",
    ru: "Сохранение...",
    uk: "Збереження...",
  },
  saveChanges: {
    no: "Lagre endringer",
    en: "Save changes",
    ru: "Сохранить изменения",
    uk: "Зберегти зміни",
  },
  addMessage: {
    no: "Legg til melding",
    en: "Add message",
    ru: "Добавить сообщение",
    uk: "Додати повідомлення",
  },
  cancel: {
    no: "Avbryt",
    en: "Cancel",
    ru: "Отмена",
    uk: "Скасувати",
  },
  activeMessages: {
    no: "Aktive meldinger",
    en: "Active messages",
    ru: "Активные сообщения",
    uk: "Активні повідомлення",
  },
  publishedMessages: {
    no: "Oversikt over publiserte driftsmeldinger",
    en: "Overview of published operational updates",
    ru: "Список опубликованных системных сообщений",
    uk: "Список опублікованих системних повідомлень",
  },
  fetchingMessages: {
    no: "Henter meldinger...",
    en: "Fetching messages...",
    ru: "Получение сообщений...",
    uk: "Отримання повідомлень...",
  },
  noMessagesYet: {
    no: "Ingen meldinger ennå",
    en: "No messages yet",
    ru: "Пока нет сообщений",
    uk: "Поки немає повідомлень",
  },
  createFirstMessage: {
    no: "Opprett din første driftsmelding i skjemaet ovenfor.",
    en: "Create your first operational update using the form above.",
    ru: "Создайте первое сообщение с помощью формы выше.",
    uk: "Створіть перше повідомлення за допомогою форми вище.",
  },
  edit: {
    no: "Rediger",
    en: "Edit",
    ru: "Изменить",
    uk: "Змінити",
  },
  delete: {
    no: "Slett",
    en: "Delete",
    ru: "Удалить",
    uk: "Видалити",
  },
  deleteConfirmation: {
    no: "Er du sikker på at du vil slette denne meldingen?",
    en: "Are you sure you want to delete this message?",
    ru: "Вы уверены, что хотите удалить это сообщение?",
    uk: "Ви впевнені, що хочете видалити це повідомлення?",
  },
  fillFields: {
    no: "Fyll inn både tittel og melding.",
    en: "Please fill in both title and message.",
    ru: "Заполните заголовок и сообщение.",
    uk: "Заповніть заголовок і повідомлення.",
  },
  fetchError: {
    no: "Kunne ikke hente driftsmeldinger. Kontroller at serveren kjører.",
    en: "Could not load operational updates. Check that the server is running.",
    ru: "Не удалось загрузить сообщения. Проверьте, запущен ли сервер.",
    uk: "Не вдалося завантажити повідомлення. Перевірте, чи працює сервер.",
  },
  saveError: {
    no: "Kunne ikke lagre meldingen. Prøv igjen.",
    en: "Could not save the message. Please try again.",
    ru: "Не удалось сохранить сообщение. Попробуйте ещё раз.",
    uk: "Не вдалося зберегти повідомлення. Спробуйте ще раз.",
  },
  deleteError: {
    no: "Kunne ikke slette meldingen.",
    en: "Could not delete the message.",
    ru: "Не удалось удалить сообщение.",
    uk: "Не вдалося видалити повідомлення.",
  },
  language: {
    no: "Språk",
    en: "Language",
    ru: "Язык",
    uk: "Мова",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const STORAGE_KEY = "getsorted-language";

function getInitialLanguage(): Language {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved === "no" || saved === "en" || saved === "ru" || saved === "uk") {
    return saved;
  }

  return "no";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const t = useCallback(
    (key: string): string => {
      return translations[key]?.[language] ?? key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}


export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}