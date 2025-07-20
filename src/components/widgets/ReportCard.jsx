import { useState, useEffect } from "react";
import reportData from "../../data/reportData.json";
import { File } from "lucide-react";
import report_image from "../../assets/Image.png";

// Size-based styles
const cardWidths = {
  small: "w-100",
  medium: "w-200",
  large: "w-100",
};

const cardHeights = {
  small: "h-100",
  medium: "h-100",
  large: "h-120",
};

export default function ReportCard({ size = "small", preview = false }) {
  const [currentWeekData, setCurrentWeekData] = useState(null);
  const [pastWeeks, setPastWeeks] = useState([]);

  useEffect(() => {
    if (reportData && reportData.length > 0) {
      setCurrentWeekData(reportData[0]);
      setPastWeeks(reportData.slice(1, 5));
    }
  }, []);

  if (!currentWeekData) return null;

  if (preview) {
    const firstReport = currentWeekData.reports?.[0];

    return (
      <div className="w-full h-full flex items-center justify-center bg-white dark:bg-[#171717] rounded-xl text-black dark:text-white">
        <div className="flex flex-col truncate items-center justify-center text-center px-4 py-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mb-2">
            <File size={16} className="text-teal-500" />
          </div>
          <span className="text-xs font-medium">
            Week {currentWeekData.weekNumber}
          </span>
          {firstReport && (
            <span className="text-[0.65rem] text-gray-600 dark:text-gray-400 mt-1 max-w-[9rem] truncate">
              {firstReport.commodity} • {currentWeekData.weekRange}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white dark:bg-[#171717] text-black dark:text-white p-6 rounded-3xl flex flex-col ${
        cardWidths[size]
      } ${cardHeights[size]} ${size !== "small" ? " pr-2" : ""}`}
    >
      {/* Small layout */}
      {size === "small" && (
        <>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
                <File fill="#26A69A" />
              </div>
              <div className="text-md font-semibold">
                Reports - Week {currentWeekData.weekNumber}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {pastWeeks.map((week) => (
              <div key={week.weekNumber} className="p-2 flex flex-col gap-2">
                <img
                  src={report_image}
                  alt={`Week ${week.weekNumber} preview`}
                  className="h-20 object-contain rounded"
                />
                <div className="text-sm font-medium text-center text-black dark:text-white">
                  {week.reports[0].commodity} • {week.weekRange}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Medium layout */}
      {size === "medium" && (
        <div
          style={{
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#262626 #333",
          }}
          className="flex flex-col gap-6 pr-2"
        >
          {reportData.map((week) => (
            <div key={week.weekNumber}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <File fill="#26A69A" />
                </div>
                <div className="text-sm font-semibold">
                  Reports - Week {week.weekNumber}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {week.reports.map((report, idx) => (
                  <div
                    key={`${week.weekNumber}-${idx}`}
                    className="bg-gray-100 dark:bg-[#262626] rounded-xl p-3 flex items-center gap-4"
                  >
                    <img
                      src={report_image}
                      alt={`Week ${week.weekNumber} - ${report.commodity}`}
                      className="h-20 object-contain rounded"
                    />
                    <div className="text-sm font-medium text-start leading-tight space-y-2">
                      <div className="text-black dark:text-[#FAFAFA]">
                        {report.commodity}
                      </div>
                      <div className="text-gray-600 dark:text-[#A3A3A3]">
                        {week.weekRange}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Large layout */}
      {size === "large" && (
        <div className="flex flex-col gap-6 scrollbar-thin dark:scrollbar-thumb-[#737373] scrollbar-track-transparent pr-2">
          {reportData.map((week) => (
            <div key={week.weekNumber}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <File fill="#26A69A" />
                </div>
                <div className="text-sm font-semibold">
                  Reports - Week {week.weekNumber}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {week.reports.map((report, idx) => (
                  <div key={`${week.weekNumber}-${idx}`} className="p-3 gap-4">
                    <img
                      src={report_image}
                      alt={`Week ${week.weekNumber} - ${report.commodity}`}
                      className="h-20 object-contain rounded"
                    />
                    <div className="text-sm font-medium text-center leading-tight space-y-2">
                      <div className="text-black dark:text-[#FAFAFA]">
                        {report.commodity}
                      </div>
                      <div className="text-gray-600 dark:text-[#A3A3A3]">
                        {week.weekRange}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
