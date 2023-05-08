import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const options = {
   maintainAspectRatio: false, // график адаптивен по ширине страницы
   responsive: true,
   aspectRatio: 2,
   plugins: {
      tooltip: {
         titleFont: {
            size: 22,
         },
         bodyFont: { size: 18 }, // изменяем размер текста
      },
      legend: {
         labels: {
            boxHeight: 20, // change label font size here
            font: { size: 18 },
         },
      },
   },
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
   let chartData = {};

   if (data.length > 0) {
      chartData = {
         labels: data[0].map(({ date }) => date), // массив значений шкалы date
         datasets: data.map((item) => ({
            label: item[0].name,
            data: item.map(({ value }) => value), // массив значений value
            fill: false, // заполнение области под графиком не нужно
            borderWidth: 2, // толщина графика
            lineTension: 0,
            pointHoverRadius: 7, // радиус точки при наведении
         })),
      };
   } else {
      chartData = {
         labels: [], // массив значений шкалы date
      };
   }

   return (
      <div className="SessionDashboardComponent__LineChartContainer">
         {chartData.labels.length > 0 ? (
            <Chart type="line" data={chartData} options={options} />
         ) : (
            <h1 className="Graph__NoDataFoundHeader">No data found</h1>
         )}
      </div>
   );
};
