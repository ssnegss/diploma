import React, { useRef, useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";

const options = {
   // maintainAspectRatio: false, // график адаптивен по ширине страницы
   plugins: {
      legend: {
         display: false,
      },
   },
};

const Graph = ({ dataFirst, dataSecond }) => {
   const chartData = {
      labels: dataFirst.map(({ date }) => date), // массив значений шкалы date
      datasets: [
         {
            label: "Общая стоимость, Р",
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
            label: "Стоимость за потреблённую энергию, Р",
            data: dataSecond.map(({ price }) => price), // массив значений price
            fill: false, // заполнение области под графиком не нужно
            backgroundColor: "rgba(255, 99, 132, 0.4)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 2, // толщина графика
            lineTension: 0,
            pointHoverRadius: 7, // радиус точки при наведении
            pointHoverBackgroundColor: "blue", // цвет точки при наведении
         },
         {
            label: "Оплачено, Р",
            data: dataSecond.map(({ price }) => price), // массив значений price
            fill: false, // заполнение области под графиком не нужно
            backgroundColor: "rgba(65, 31, 132, 0.4)",
            borderColor: "rgba(65, 31, 132, 1)",
            borderWidth: 2, // толщина графика
            lineTension: 0,
            pointHoverRadius: 7, // радиус точки при наведении
            pointHoverBackgroundColor: "blue", // цвет точки при наведении
         },
      ],
   };

   return (
      <div className="graph-container">
         <Chart
            type="line"
            data={chartData}
            // options={options}
         />
      </div>
   );
};
export default Graph;
