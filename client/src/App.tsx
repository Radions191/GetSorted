
import { Routes, Route } from "react-router-dom";
import { InfoScreen } from "./pages/InfoScreen";
import { AdminPanel } from "./pages/AdminPanel";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<InfoScreen />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
