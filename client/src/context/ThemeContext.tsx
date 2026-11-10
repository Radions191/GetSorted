import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "dark" | "light" | "custom";

export interface ThemeColors {
  background: string;
  surface: string;
  card: string;
  text: string;
  muted: string;
  accent: string;
  accentSecondary: string;
}

interface ThemeContextType {
  mode: ThemeMode;
  colors: ThemeColors;
  setMode: (mode: ThemeMode) => void;
  updateColor: (key: keyof ThemeColors, value: string) => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const darkColors: ThemeColors = {
  background: "#09090f",
  surface: "#12121c",
  card: "#171725",
  text: "#f4f4f8",
  muted: "#9292a8",
  accent: "#8b5cf6",
  accentSecondary: "#06b6d4",
};

const lightColors: ThemeColors = {
  background: "#f4f5fb",
  surface: "#ffffff",
  card: "#ffffff",
  text: "#191927",
  muted: "#73738a",
  accent: "#7048e8",
  accentSecondary: "#0891b2",
};

const defaultCustomColors: ThemeColors = {
  ...darkColors,
  background: "#101522",
  surface: "#192235",
  card: "#202d43",
  accent: "#38bdf8",
};

const STORAGE_KEY = "getsorted-theme";

interface SavedTheme {
  mode: ThemeMode;
  customColors: ThemeColors;
}

const defaultTheme: SavedTheme = {
  mode: "dark",
  customColors: defaultCustomColors,
};

function getInitialTheme(): SavedTheme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return defaultTheme;
    }

    const parsed = JSON.parse(saved) as Partial<SavedTheme>;

    const mode: ThemeMode =
      parsed.mode === "dark" ||
      parsed.mode === "light" ||
      parsed.mode === "custom"
        ? parsed.mode
        : "dark";

    return {
      mode,
      customColors: {
        ...defaultCustomColors,
        ...(parsed.customColors ?? {}),
      },
    };
  } catch (error) {
    console.error("Theme loading error:", error);
    return defaultTheme;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<SavedTheme>(getInitialTheme);

  const { mode, customColors } = theme;

  const colors =
    mode === "light"
      ? lightColors
      : mode === "custom"
        ? customColors
        : darkColors;

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--surface", colors.surface);
    root.style.setProperty("--card", colors.card);
    root.style.setProperty("--text", colors.text);
    root.style.setProperty("--muted", colors.muted);
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--accent-secondary", colors.accentSecondary);

    root.style.setProperty(
      "--border",
      mode === "light"
        ? "rgba(20, 20, 40, 0.10)"
        : "rgba(255, 255, 255, 0.09)"
    );

    root.style.colorScheme = mode === "light" ? "light" : "dark";
  }, [colors, mode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  }, [theme]);

  const setMode = (newMode: ThemeMode) => {
    setTheme((previous) => ({
      ...previous,
      mode: newMode,
    }));
  };

  const updateColor = (key: keyof ThemeColors, value: string) => {
    setTheme((previous) => ({
      ...previous,
      mode: "custom",
      customColors: {
        ...previous.customColors,
        [key]: value,
      },
    }));
  };

  return (
    <ThemeContext.Provider value={{ mode, colors, setMode, updateColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}