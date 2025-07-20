import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle Theme"
      className={`
        relative w-16 h-9 rounded-full p-1 flex items-center justify-between
        transition-colors duration-300 ease-in-out
        ${darkMode ? "bg-[#00695C]" : "bg-[#26A69A]"}
      `}
    >
      {/* Toggle Thumb */}
      <div
        className={`
          absolute top-0.5 left-0.5 w-8 h-8 rounded-full bg-white shadow-md
          transform transition-transform duration-300 ease-in-out
          ${darkMode ? "translate-x-0" : "translate-x-[90%]"}
          z-10 flex items-center justify-center
        `}
      >
        {darkMode ? (
          <Moon size={20} className="text-[#00695C]" />
        ) : (
          <Sun size={20} className="text-[#00695C]" />
        )}
      </div>

      {/* Icons in Background */}
      <div className="flex w-full justify-between items-center px-2 z-0">
        <Moon size={16} className="text-[#80CBC4]" />
        <Sun size={16} className="text-[#80CBC4]" />
      </div>
    </button>
  );
}

export default ThemeToggle;
