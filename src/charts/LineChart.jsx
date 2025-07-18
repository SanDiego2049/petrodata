import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

export default function LineChart({
  prices,
  dates,
  isDown,
  size = "small",
  showGrid = false,
  showXAxisLabels = false,
  showYAxisLabels = false,
}) {
  const lineColor = isDown ? "#ef4444" : "#22c55e";

  // Generate day labels for x-axis (MON, TUE, WED, etc.)
  const generateDayLabels = () => {
    const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    return dates.map((_, index) => days[index % 7]);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1000, easing: "easeOutQuart" },
    elements: {
      point: { radius: 0, hitRadius: 10 },
      line: { tension: 0.3 },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (ctx) => `Date: ${dates[ctx[0].dataIndex]}`,
          label: (ctx) => `₦${ctx.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        display: showXAxisLabels,
        grid: {
          display: showGrid,
          color: "#374151",
          borderDash: [6, 6],
          drawTicks: false,
          drawBorder: false,
        },
        ticks: {
          display: showXAxisLabels,
          color: "#9CA3AF",
          font: {
            size: 12,
            weight: "500",
          },
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        display: showYAxisLabels,
        position: showYAxisLabels ? "right" : "left",
        grid: {
          display: showGrid && showYAxisLabels,
          color: "#374151",
          borderDash: [6, 6],
          drawTicks: false,
          drawBorder: false,
        },
        ticks: {
          display: showYAxisLabels,
          color: "#9CA3AF",
          font: {
            size: 12,
            weight: "500",
          },
          callback: function (value) {
            return value.toFixed(2);
          },
          stepSize: 20,
        },
      },
    },
  };

  const data = {
    labels: showXAxisLabels ? generateDayLabels() : dates,
    datasets: [
      {
        data: prices,
        borderColor: lineColor,
        borderWidth: size === "small" ? 2 : 3,
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(
            0,
            isDown ? "rgba(239, 68, 68, 0.4)" : "rgba(34, 197, 94, 0.4)"
          );
          gradient.addColorStop(1, "rgba(0,0,0,0)");
          return gradient;
        },
        fill: true,
      },
    ],
  };

  return <Line data={data} options={options} />;
}
