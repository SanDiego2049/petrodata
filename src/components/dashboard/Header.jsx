import { AlarmClockPlus, Bell, Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = ({ onSetAlertClick }) => (
  <header className="px-4 py-3 mt-2 md:px-8 md:py-5 md:mt-4 pt-16 sm:pt-12 md:pt-5">
    <div className="flex items-center justify-between">
      {/* Left: Greeting */}
      <div className="flex items-center gap-2 md:gap-4">
        <div>
          <h1 className="text-xl md:text-3xl font-medium">Hello, Admin</h1>
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search button */}
        <button className="bg-gray-200 dark:bg-[#2C3138] hover:bg-gray-300 dark:hover:bg-gray-700 p-2 md:p-3 rounded-full">
          <Search size={18} className="md:w-5 md:h-5" />
        </button>

        {/* Set alert button */}
        <button
          onClick={onSetAlertClick}
          className="
            hidden sm:flex items-center gap-1 md:gap-2 px-2 py-2 md:px-4 md:py-3 
            rounded-full text-xs md:text-sm font-medium
            bg-gray-200 dark:bg-[#2C3138] hover:bg-gray-300 dark:hover:bg-gray-700
          "
        >
          <AlarmClockPlus size={18} className="md:w-5 md:h-5" />
          <span className="hidden md:inline">Set alert</span>
        </button>

        {/* Notifications */}
        <button className="bg-gray-200 dark:bg-[#2C3138] hover:bg-gray-300 dark:hover:bg-gray-700 p-2 md:p-3 rounded-full">
          <Bell size={18} className="md:w-5 md:h-5" />
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </div>

    <hr className="mt-6 md:mt-10 border-[#404040]" />
  </header>
);

export default Header;
