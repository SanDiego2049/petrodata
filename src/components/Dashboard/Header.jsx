import { AlarmClockPlus, Bell, Moon, Search, Sun } from "lucide-react";

const Header = ({ darkMode, setDarkMode, onSetAlertClick }) => (
  <header className="px-4 py-3 mt-2 md:px-8 md:py-5 md:mt-4 pt-16 sm:pt-12 md:pt-5">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-4">
        <div>
          <h1 className="text-xl md:text-3xl font-medium">Hello, Admin</h1>
          <p
            className={`${
              darkMode ? "text-gray-400" : "text-gray-500"
            } text-xs md:text-sm`}
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button
          className={`${
            darkMode
              ? "bg-[#2C3138] hover:bg-gray-700"
              : "bg-gray-200 hover:bg-gray-300"
          } p-2 md:p-3 rounded-full`}
        >
          <Search size={18} className="md:w-5 md:h-5" />
        </button>

        <button
          onClick={onSetAlertClick}
          className={`
            ${
              darkMode
                ? "bg-[#2C3138] hover:bg-gray-700"
                : "bg-gray-200 hover:bg-gray-300"
            } 
            sm:flex items-center gap-1 md:gap-2 px-2 py-2 md:px-4 md:py-3 
            rounded-full text-xs md:text-sm font-medium
            hidden
          `}
        >
          <AlarmClockPlus size={18} className="md:w-5 md:h-5" />
          <span className="hidden md:inline">Set alert</span>
        </button>

        <button
          className={`${
            darkMode
              ? "bg-[#2C3138] hover:bg-gray-700"
              : "bg-gray-200 hover:bg-gray-300"
          } p-2 md:p-3 rounded-full`}
        >
          <Bell size={18} className="md:w-5 md:h-5" />
        </button>

        <div className="bg-[#00695C] p-0.5 md:p-1 rounded-full flex items-center gap-0.5 md:gap-1">
          {[
            { icon: <Sun size={18} className="md:w-5 md:h-5" />, mode: false },
            { icon: <Moon size={18} className="md:w-5 md:h-5" />, mode: true },
          ].map(({ icon, mode }) => (
            <button
              key={mode ? "dark" : "light"}
              onClick={() => setDarkMode(mode)}
              className={`p-1.5 md:p-2 rounded-full cursor-pointer ${
                darkMode === mode ? "bg-white text-[#00695C]" : "text-[#80CBC4]"
              }`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    </div>
    <hr className="mt-6 md:mt-10 text-[#404040]" />
  </header>
);

export default Header;
