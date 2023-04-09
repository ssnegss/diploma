import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const options = {
   maintainAspectRatio: false, // график адаптивен по ширине страницы
   responsive: true,
   legend: {
      labels: {
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
         pointHoverBackgroundColor: [
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
   },
};

export const MultiLineChart = ({ data }) => {
   const chartData = {
      labels: data[0].map(({ date }) => date), // массив значений шкалы date
      datasets: data.map((item) => ({
         label: item[0].name,
         data: item.map(({ price }) => price), // массив значений price
         fill: false, // заполнение области под графиком не нужно
         borderWidth: 2, // толщина графика
         lineTension: 0,
         pointHoverRadius: 7, // радиус точки при наведении
      })),
   };

   return (
      <div className="graph-container">
         <Chart type="line" data={chartData} options={options} />
      </div>
   );
};
