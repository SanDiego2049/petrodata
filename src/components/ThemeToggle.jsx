import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react"; // Assuming you're using lucide-react for icons

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false); // Or get this from context/Redux

  // Effect to apply/remove the 'dark' class to the body (Tailwind's dark mode strategy)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark"); // Tailwind typically uses 'dark' class on html
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Cleanup function: remove 'dark' class when component unmounts
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [darkMode]); // Dependency array: re-run effect when darkMode changes

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    // Outer container for the toggle (background)
    <div
      className={`
        p-1 rounded-full flex items-center gap-1
        transition-colors duration-300 ease-in-out
        ${darkMode ? "bg-gray-800" : "bg-[#00695C]"}
      `}
    >
      {/* Sun/Moon Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className={`
          p-2 rounded-full cursor-pointer
          flex items-center justify-center
          transition-colors duration-300 ease-in-out
          ${
            darkMode
              ? "bg-white text-[#00695C]" // Active in dark mode
              : "bg-white text-[#00695C]" // Active in light mode
          }
        `}
      >
        {/*
          Conditionally render Sun or Moon icon.
          The button's background and text color are set based on its 'active' state,
          not directly on darkMode here, as the button itself toggles.

          Let's refine the icon color logic:
          When darkMode is true, show Sun. Sun should be 'active' looking.
          When darkMode is false, show Moon. Moon should be 'active' looking.
          The other icon will implicitly not be rendered.
        */}
        {darkMode ? (
          <Sun
            size={20}
            className="text-[#00695C] transition-colors duration-300"
          /> // Sun when dark mode is on
        ) : (
          <Moon
            size={20}
            className="text-[#00695C] transition-colors duration-300"
          /> // Moon when light mode is on
        )}
      </button>
    </div>
  );
}

export default ThemeToggle;
