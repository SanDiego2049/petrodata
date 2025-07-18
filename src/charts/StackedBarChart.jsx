import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StackedBarChart({
  data = [],
  height = 200,
  showYAxisRight = false,
  colors = {
    Commercial: "#3B82F6",
    Military: "#10B981",
    Private: "#F59E0B",
  },
}) {
  const labels = data.map((d) => d.date);

  const datasetKeys = Object.keys(colors); // ["Commercial", "Military", "Private"]

  const chartData = {
    labels,
    datasets: datasetKeys.map((key) => ({
      label: key,
      data: data.map((d) => d[key]),
      backgroundColor: colors[key],
      stack: "stack1",
      barPercentage: 0.6,
      borderRadius: 8,
      barThickness: 12,
    })),
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          color: "#262626",
        },
        ticks: {
          color: "#A3A3A3",
          font: {
            size: 10,
          },
        },
      },
      y: {
        stacked: true,
        position: showYAxisRight ? "right" : "left",
        grid: {
          color: "#262626",
        },
        ticks: {
          color: "#A3A3A3",
          callback: (value) => {
            return value >= 1000 ? `${value / 1000}k` : value;
          },
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return (
    <div style={{ height }}>
      <Bar options={options} data={chartData} />
    </div>
  );
}
