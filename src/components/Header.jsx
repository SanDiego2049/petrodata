import { AlarmClockPlus, Bell, Moon, Search, Sun } from "lucide-react";

const Header = ({ darkMode, setDarkMode }) => (
  <header className="px-8 py-5 mt-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-3xl font-medium">Hello, John</h1>
          <p
            className={`${
              darkMode ? "text-gray-400" : "text-gray-500"
            } text-sm`}
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Right Side: Actions */}
      <div className="flex items-center gap-4">
        <button
          className={`${
            darkMode
              ? "bg-[#2C3138] hover:bg-gray-700"
              : "bg-gray-200 hover:bg-gray-300"
          } p-3 rounded-full`}
        >
          <Search size={20} />
        </button>
        <button
          className={`${
            darkMode
              ? "bg-[#2C3138] hover:bg-gray-700"
              : "bg-gray-200 hover:bg-gray-300"
          } flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium`}
        >
          <AlarmClockPlus size={20} />
          <span>Set alert</span>
        </button>
        <button
          className={`${
            darkMode
              ? "bg-[#2C3138] hover:bg-gray-700"
              : "bg-gray-200 hover:bg-gray-300"
          } p-3 rounded-full`}
        >
          <Bell size={20} />
        </button>

        {/* Dark Mode Toggle */}
        <div className="bg-[#00695C] p-1 rounded-full flex items-center gap-1">
          {[
            { icon: <Sun size={20} />, mode: false },
            { icon: <Moon size={20} />, mode: true },
          ].map(({ icon, mode }) => (
            <button
              key={mode ? "dark" : "light"}
              onClick={() => setDarkMode(mode)}
              className={`p-2 rounded-full cursor-pointer ${
                darkMode === mode ? "bg-white text-[#00695C]" : "text-[#80CBC4]"
              }`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    </div>
    <hr className="mt-10 text-[#404040]" />
  </header>
);

export default Header;
