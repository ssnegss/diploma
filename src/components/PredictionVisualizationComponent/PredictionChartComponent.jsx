import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

export const ChartComponent = ({ data, predictions }) => {
   const chartData = {
      labels: Array.from(
         { length: data.length + predictions.length },
         (_, i) => `Day ${i + 1}`
      ),
      datasets: [
         {
            label: "Actual",
            data: data.map((d) => d.y),
            backgroundColor: "rgba(75, 192, 192, 0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
            fill: false,
         },
         {
            label: "Predicted",
            data: [...data.map((d) => null), ...predictions],
            backgroundColor: "rgba(255, 99, 132, 0.4)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            fill: false,
         },
      ],
   };

   return (
      // <Line data={chartData} />
      <Chart type="line" data={chartData} />
   );
};
