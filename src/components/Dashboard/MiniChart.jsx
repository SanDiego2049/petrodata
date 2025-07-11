import { useEffect, useRef } from "react";
import { Chart as ChartJS } from "chart.js/auto";

const MiniChart = ({ data, color, trend }) => {
  // 'data' prop is now used
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");

    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const generateChartData = () => {
      const points = 20;
      const baseValue = 50;
      const generatedData = [];

      for (let i = 0; i < points; i++) {
        let value;
        if (trend === "up") {
          value = baseValue + i * 2 + Math.random() * 10;
        } else if (trend === "down") {
          value = baseValue + 20 - i * 2 + Math.random() * 10;
        } else {
          value = baseValue + Math.random() * 20;
        }
        generatedData.push(value);
      }
      return generatedData;
    };

    // Use provided data if available, otherwise generate
    const finalChartData = data && data.length > 0 ? data : generateChartData();

    chartInstanceRef.current = new ChartJS(ctx, {
      type: "line",
      data: {
        labels: new Array(finalChartData.length).fill(""),
        datasets: [
          {
            data: finalChartData,
            borderColor: color,
            backgroundColor: color + "20",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        scales: {
          x: { display: false, grid: { display: false } },
          y: { display: false, grid: { display: false } },
        },
        elements: { point: { radius: 0 } },
        interaction: { intersect: false },
      },
    });

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, [data, color, trend]); // Added data to dependency array

  return (
    <div className="w-full h-12">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default MiniChart;
