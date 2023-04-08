import React, { useRef, useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";

// const options = {
//    maintainAspectRatio: false, // график адаптивен по ширине страницы
// };

const Graph = ({ data }) => {
   const chartData = {
      labels: data.map(({ date }) => date), // массив значений шкалы date
      datasets: [
         {
            label: "Общая стоимость, Р",
            data: data.map(({ price }) => price), // массив значений price
            fill: false, // заполнение области под графиком не нужно
            borderColor: "#4A90E2", // цвет графика
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
