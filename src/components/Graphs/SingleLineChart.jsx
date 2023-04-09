import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const options = {
   maintainAspectRatio: false, // график адаптивен по ширине страницы
   responsive: true,
};

export const SingleLineChart = ({ data }) => {
   const chartData = {
      labels: data.map(({ date }) => date), // массив значений шкалы date
      datasets: [
         {
            label: data[0].name,
            data: data.map(({ value }) => value), // массив значений value
            fill: false, // заполнение области под графиком не нужно
            backgroundColor: "rgba(75, 192, 192, 0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 2, // толщина графика
            lineTension: 0,
            pointHoverRadius: 7, // радиус точки при наведении
            pointHoverBackgroundColor: "blue", // цвет точки при наведении
         },
      ],
   };

   return (
      <div className="graph-container">
         <Chart type="line" data={chartData} options={options} />
      </div>
   );
};
