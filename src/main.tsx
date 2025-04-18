
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add dark mode class based on user preference before rendering
const setInitialTheme = () => {
  const theme = localStorage.getItem("theme") || "system";
  const root = window.document.documentElement;
  
  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
};

setInitialTheme();

createRoot(document.getElementById("root")!).render(<App />);
