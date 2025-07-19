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

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle Theme"
      className={`
        relative w-16 h-10 rounded-full p-1 flex items-center
        transition-colors duration-300 ease-in-out
        ${darkMode ? "bg-[#26A69A] " : "bg-[#00695C] text-[#26A69A]"}
      `}
    >
      <div
        className={`
          w-9 h-9 rounded-full shadow-md transform
          transition-transform duration-300 ease-in-out pointer-events-none
          flex items-center justify-center
          ${darkMode ? "translate-x-5.5 bg-white" : "-translate-x-0.5 bg-white"}
        `}
      >
        {darkMode ? (
          <Sun
            size={20}
            className={`${darkMode ? "text-[#00695C]" : "text-[#80CBC4]"} `}
          />
        ) : (
          <Moon
            size={20}
            className={`${darkMode ? "text-[#80CBC4]" : "text-[#00695C]"} `}
          />
        )}
      </div>
    </button>
  );
}

export default ThemeToggle;
