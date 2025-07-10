import { FileText } from "lucide-react";

const ReportsCard = ({ darkMode }) => {
  const reports = [
    { name: "PMS", period: "Aug 12-17" },
    { name: "DPK", period: "Aug 12-17" },
    { name: "AGO", period: "Aug 12-17" },
    { name: "ICE", period: "Aug 12-17" },
  ];

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-xl p-6 border ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
          <FileText className="w-4 h-4 text-white" />
        </div>
        <span
          className={`font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Reports - week 31
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {reports.map((report, index) => (
          <div
            key={index}
            className={`${
              darkMode ? "bg-gray-700" : "bg-gray-50"
            } rounded-lg p-4 text-center`}
          >
            <div
              className={`w-12 h-16 ${
                darkMode ? "bg-gray-600" : "bg-white"
              } rounded mx-auto mb-2`}
            ></div>
            <div
              className={`text-sm font-medium ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {report.name} - {report.period}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsCard;
