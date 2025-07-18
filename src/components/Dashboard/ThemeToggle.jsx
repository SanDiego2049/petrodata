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
        relative w-16 h-8 rounded-full p-1 flex items-center
        transition-colors duration-300 ease-in-out
        ${darkMode ? "bg-gray-700" : "bg-[#00695C]"}
      `}
    >
      <div
        className={`
          w-6 h-6 rounded-full shadow-md transform
          transition-transform duration-300 ease-in-out pointer-events-none
          flex items-center justify-center
          ${darkMode ? "translate-x-8 bg-white" : "translate-x-0 bg-white"}
        `}
      >
        {darkMode ? (
          <Moon size={16} className="text-[#00695C]" />
        ) : (
          <Sun size={16} className="text-[#00695C]" />
        )}
      </div>
    </button>
  );
}

export default ThemeToggle;


<div
  className={`flex justify-between items-center py-2 ${
    index !== arr.length - 1 ? "border-b border-[#333]" : ""
  }`}
></div>