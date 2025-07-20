import { useState } from "react";
import { X, Check, FileText, CheckCheck } from "lucide-react";
import image1 from "../../assets/dangote.png";
import image2 from "../../assets/news_image.png";
import image3 from "../../assets/oando.png";

const NotificationsModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("All");

  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      type: "invite",
      user: {
        name: "David Osapolo",
        avatar: image1,
        online: true,
      },
      content: "Invited Aliyu Tosin to the La'organisation",
      timestamp: "2 mins ago",
      hasGreenDot: true,
    },
    {
      id: 2,
      type: "comment",
      user: {
        name: "Gideon Osama",
        avatar: image2,
        online: true,
      },
      content: "Commented in PMS Price Analysis",
      description:
        '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id."',
      timestamp: "5 mins ago",
      hasGreenDot: false,
    },
    {
      id: 3,
      type: "alert",
      user: {
        name: "Price Drop Alert",
        avatar: null,
        online: false,
      },
      content: "PMS Falls Below ₦500/Liter",
      description:
        "The price of Premium Motor Spirit (PMS) has dropped to ₦495 per litre. This is a 3% decrease from last week.",
      timestamp: "30 mins ago",
      hasGreenDot: true,
      isSystemAlert: true,
    },
    {
      id: 4,
      type: "mention",
      user: {
        name: "Gideon Osama",
        avatar: image3,
        online: true,
      },
      content: "Mentioned you in PMS Price Analysis",
      description:
        '"@john Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id."',
      timestamp: "5 mins ago",
      hasGreenDot: true,
    },
    {
      id: 5,
      type: "report",
      user: {
        name: "Weekly Report",
        avatar: null,
        online: false,
      },
      content: "PMS Market Analysis Now Available",
      timestamp: "30 mins ago",
      hasGreenDot: true,
      isSystemReport: true,
    },
  ];

  const tabs = ["All", "Comments", "Mentioned"];

  return (
    <div className="fixed inset-0 z-50 backdrop-blur bg-black/50 flex items-center justify-center overflow-hidden px-4">
      <div className="bg-gray-100 dark:bg-[#171717] rounded-2xl w-full max-w-md flex flex-col max-h-[90vh] text-black dark:text-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-lg font-medium">Your notifications</h2>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pb-4">
          <div className="flex bg-gray-100 dark:bg-[#171717] border border-[#404040] rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-gray-300 dark:bg-[#525252] text-black dark:text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4 scrollbar-thin dark:scrollbar-thumb-[#737373] scrollbar-track-transparent">
          {notifications
            .filter((notification) => {
              if (activeTab === "Comments") {
                return notification.content.toLowerCase().includes("commented");
              }
              if (activeTab === "Mentioned") {
                return notification.content.toLowerCase().includes("mentioned");
              }
              return true;
            })
            .map((notification) => (
              <div key={notification.id} className="flex items-start gap-3">
                {/* Avatar or Icon */}
                <div className="relative flex-shrink-0">
                  {notification.isSystemAlert ? (
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Check
                        size={20}
                        className="text-gray-500 dark:text-gray-300"
                      />
                    </div>
                  ) : notification.isSystemReport ? (
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <FileText
                        size={20}
                        className="text-gray-500 dark:text-gray-300"
                      />
                    </div>
                  ) : (
                    <img
                      src={notification.user.avatar}
                      alt={notification.user.name}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  )}
                  {notification.user.online &&
                    !notification.isSystemAlert &&
                    !notification.isSystemReport && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-[#262626]" />
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          {notification.user.name}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          {notification.timestamp}
                        </span>
                      </div>
                      <div className="mt-0.5 text-sm">
                        {notification.type === "invite" && (
                          <p className="text-gray-700 dark:text-gray-300">
                            Invited{" "}
                            <span className="text-teal-600 dark:text-teal-400">
                              Aliyu Tosin
                            </span>{" "}
                            to the{" "}
                            <span className="text-gray-900 dark:text-gray-200">
                              La'organisation
                            </span>
                          </p>
                        )}
                        {notification.type === "comment" && (
                          <>
                            <p className="text-gray-700 dark:text-gray-300">
                              Commented in{" "}
                              <span className="text-teal-600 dark:text-teal-400">
                                PMS Price Analysis
                              </span>
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">
                              {notification.description}
                            </p>
                          </>
                        )}
                        {notification.type === "alert" && (
                          <>
                            <p className="text-teal-600 dark:text-teal-400 font-medium">
                              {notification.content}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">
                              {notification.description}
                            </p>
                          </>
                        )}
                        {notification.type === "mention" && (
                          <>
                            <p className="text-gray-700 dark:text-gray-300">
                              Mentioned you in{" "}
                              <span className="text-teal-600 dark:text-teal-400">
                                PMS Price Analysis
                              </span>
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">
                              {notification.description}
                            </p>
                          </>
                        )}
                        {notification.type === "report" && (
                          <p className="text-teal-600 dark:text-teal-400">
                            {notification.content}
                          </p>
                        )}
                      </div>
                    </div>
                    {notification.hasGreenDot && (
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-1" />
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 pt-4 truncate">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 bg-gray-300 dark:bg-[#525252] hover:bg-gray-200 dark:hover:bg-[#747474] text-black dark:text-white rounded-full text-sm font-medium transition-colors"
          >
            Close
          </button>
          <button className="flex-1 py-3 px-6 bg-[#00897B] hover:bg-teal-500 text-white rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2">
            <CheckCheck size={16} />
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
