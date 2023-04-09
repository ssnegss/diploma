import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const options = {
   maintainAspectRatio: false, // график адаптивен по ширине страницы
   responsive: true,
   // plugins: {
   //    legend: {
   //       display: false,
   //    },
   // },
};

export const LineChart = ({ dataFirst, dataSecond, dataThird }) => {
   const chartData = {
      labels: dataFirst.map(({ date }) => date), // массив значений шкалы date
      datasets: [
         {
            label: dataFirst[0].name,
            data: dataFirst.map(({ price }) => price), // массив значений price
            fill: false, // заполнение области под графиком не нужно
            backgroundColor: "rgba(75, 192, 192, 0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 2, // толщина графика
            lineTension: 0,
            pointHoverRadius: 7, // радиус точки при наведении
            pointHoverBackgroundColor: "blue", // цвет точки при наведении
         },
         {
            label: dataSecond[0].name,
            data: dataSecond.map(({ price }) => price),
            fill: false,
            backgroundColor: "rgba(255, 99, 132, 0.4)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 2,
            lineTension: 0,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: "blue",
         },
         {
            label: dataThird[0].name,
            data: dataThird.map(({ price }) => price),
            fill: false,
            backgroundColor: "rgba(65, 31, 132, 0.4)",
            borderColor: "rgba(65, 31, 132, 1)",
            borderWidth: 2,
            lineTension: 0,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: "blue",
         },
      ],
   };

   // const chartData = {
   //    labels: data[0].map(({ date }) => date), // массив значений шкалы date
   //    datasets: data.map((item) =>  ({
   //       label: item[0].name,
   //       data: item.map(({ price }) => price), // массив значений price
   //       fill: false, // заполнение области под графиком не нужно
   //       backgroundColor: "rgba(75, 192, 192, 0.4)",
   //       borderColor: "rgba(75,192,192,1)",
   //       borderWidth: 2, // толщина графика
   //       lineTension: 0,
   //       pointHoverRadius: 7, // радиус точки при наведении
   //       pointHoverBackgroundColor: "blue", // цвет точки при наведении
   //    }))
   // };

   return (
      <div className="graph-container">
         <Chart type="line" data={chartData} options={options} />
      </div>
   );
};
