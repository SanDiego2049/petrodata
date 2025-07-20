import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

const SetAlertModal = ({ onClose }) => {
  const [commodity, setCommodity] = useState("PMS");
  const [condition, setCondition] = useState("Crossing up");
  const [price, setPrice] = useState("");
  const [expiration, setExpiration] = useState("2024-02-16T09:00");
  const [alertName, setAlertName] = useState("");
  const [description, setDescription] = useState("");
  const [activeTab, setActiveTab] = useState("Only once");

  const tabs = ["Only once", "Every time"];

  return (
    <div className="fixed inset-0 backdrop-blur bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-[#1f1f1f] text-black dark:text-white w-full max-w-md sm:rounded-3xl rounded-xl shadow-lg flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Set an alert</h2>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto text-sm px-4 sm:px-6 py-4 flex-1 space-y-4 scrollbar-thin dark:scrollbar-thumb-[#737373] scrollbar-track-transparent">
          {/* Condition Section */}
          <div className="border-b border-gray-300 dark:border-[#404040] pb-3 space-y-2">
            <label className="block text-sm text-gray-500 dark:text-gray-400">
              Condition
            </label>

            <div className="relative">
              <select
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
                className="w-full bg-gray-200 dark:bg-[#404040] text-black dark:text-white px-4 py-2 rounded-full appearance-none"
              >
                <option value="PMS">PMS</option>
                <option value="AGO">AGO</option>
                <option value="DPK">DPK</option>
                <option value="LPG">LPG</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 dark:text-white">
                <ChevronDown size={16} />
              </div>
            </div>

            <div className="relative">
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full bg-gray-200 dark:bg-[#404040] text-black dark:text-white px-4 py-2 rounded-full appearance-none"
              >
                <option value="Crossing up">Crossing up</option>
                <option value="Crossing down">Crossing down</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 dark:text-white">
                <ChevronDown size={16} />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500 dark:text-gray-400">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className="w-full bg-gray-200 dark:bg-[#404040] text-black dark:text-white px-4 py-2 rounded-full"
              />
            </div>
          </div>

          {/* Trigger Section */}
          <div className="border-b border-gray-300 dark:border-[#404040] pb-3 space-y-2">
            <label className="block text-sm text-gray-500 dark:text-gray-400">
              Trigger
            </label>

            <div className="w-full bg-gray-200 dark:bg-[#171717] rounded-lg p-1 flex justify-between">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-teal-500 dark:bg-[#525252] text-white"
                      : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              {activeTab === "Only once"
                ? "The alert will only trigger once and will not be repeated."
                : "The alert will trigger every time the condition is met, but not more than 1 time per minute."}
            </p>
          </div>

          {/* Expiration */}
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Expiration
            </label>
            <input
              type="datetime-local"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              className="w-full mt-1 bg-gray-200 dark:bg-[#404040] text-black dark:text-white px-4 py-2 rounded-full"
            />
          </div>

          {/* Alert Name & Description */}
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Alert name
            </label>
            <input
              type="text"
              value={alertName}
              onChange={(e) => setAlertName(e.target.value)}
              placeholder="Name your alert"
              className="w-full mt-1 bg-gray-200 dark:bg-[#404040] text-black dark:text-white px-4 py-2 rounded-full"
            />

            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`${commodity} crossing ${price}`}
              className="w-full mt-3 bg-gray-200 dark:bg-[#404040] text-black dark:text-white px-4 py-2 rounded-xl"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-4 border-t border-gray-300 dark:border-gray-700 px-4 sm:px-6 py-4">
          <button
            onClick={onClose}
            className="w-1/2 px-4 py-2 rounded-full bg-gray-300 dark:bg-[#404040] hover:bg-gray-400 dark:hover:bg-[#292929] text-black dark:text-white"
          >
            Cancel
          </button>
          <button className="w-1/2 px-4 py-2 rounded-full bg-[#00897B] hover:bg-teal-700 text-white">
            Create alert
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetAlertModal;
