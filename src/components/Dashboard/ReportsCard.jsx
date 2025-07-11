import { FileText } from "lucide-react";
import report_image from "../../assets/Image.png";

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
        darkMode ? "bg-[#171717] text-white" : "bg-white text-gray-900"
      } rounded-3xl p-4 sm:p-6 h-full flex flex-col`}
    >
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#E0F2F1] rounded-full flex items-center justify-center">
          <FileText className="text-[#009688] w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <span className="text-sm  font-medium">Reports - week 31</span>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          {reports.map((report, index) => (
            <div key={index} className="p-2 sm:p-4 text-center">
              <div className="w-10 h-14 sm:w-12 sm:h-16 mx-auto">
                <img
                  src={report_image}
                  alt="image of reports"
                  className="w-full h-full object-contain"
                />
              </div>
              <div
                className={`text-xs sm:text-sm font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {report.name} - <br className="sm:hidden" />
                {report.period}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsCard;
