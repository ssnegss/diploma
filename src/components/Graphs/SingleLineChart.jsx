import "chart.js/auto";
import { useSelector, useDispatch } from "react-redux";
import { DATE_COLUMN } from "../../constants/index";
import { Chart } from "react-chartjs-2";
import {
   dialogWindowOpened,
   tableDataForDialog,
} from "../../redux/actions/actionCreator";

//    Компонент графика

export const SingleLineChart = ({ data }) => {
   const dispatch = useDispatch();
   //    Получение данных из таблицы для отображения в диалоговом окне
   const csvdataWithFilters = useSelector(
      (store) => store?.dataReducer?.filteredCsvData
   );

   //    Данные для отображения на графике

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

   //    Обработчик нажатия на вершину графика

   const handleGraphClick = (e, elements) => {
      if (elements && elements.length > 0) {
         const index = elements[0].index;
         const graphDate = chartData.labels[index]; //  Получение даты по оси Х

         // Проверка на соответствие нажатой дате

         const filteredData = csvdataWithFilters.filter((item) =>
            item[DATE_COLUMN]
               ? item[DATE_COLUMN].split(" ")[0]
                    .split(".")
                    .reverse()
                    .join("-") === graphDate
               : undefined
         );

         //    Удаляем объекты с полями undefined

         const removedUndefinedData = filteredData.filter((obj) => {
            return (
               Object.keys(obj).some((key) => {
                  return obj[key] === undefined;
               }) === false
            );
         });

         dispatch(tableDataForDialog(removedUndefinedData));
         dispatch(dialogWindowOpened(true));
      }
   };

   //    Настройки для отображения графика

   const options = {
      maintainAspectRatio: false,
      responsive: true,
      onClick: handleGraphClick,
      plugins: {
         tooltip: {
            titleFont: {
               size: 22,
            },
            bodyFont: { size: 18 },
         },
         legend: {
            labels: {
               boxHeight: 20,
               font: { size: 18 },
            },
         },
      },
   };

   //    График

   return <Chart type="line" data={chartData} options={options} />;
};
