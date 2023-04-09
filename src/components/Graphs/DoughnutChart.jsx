import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

export const DoughnutChart = ({ data }) => {
   const labels = Array.from(new Set(data)); // получаем уникальные значения из массива
   const counts = labels.map(
      (label) => data.filter((item) => item === label).length
   ); // считаем количество каждого значения

   const chartData = {
      labels,
      datasets: [
         {
            data: counts,
            backgroundColor: [
               "#FF6384",
               "#36A2EB",
               "#FFCE56",
               "#1BCDD1",
               "#8E54E9",
               "#FF9F55",
               "#47BAC1",
               "#AA4488",
            ],
            hoverBackgroundColor: [
               "#FF6384",
               "#36A2EB",
               "#FFCE56",
               "#1BCDD1",
               "#8E54E9",
               "#FF9F55",
               "#47BAC1",
               "#AA4488",
            ],
         },
      ],
   };

   return <Doughnut data={chartData} />;
};
