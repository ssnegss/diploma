import "chart.js/auto";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Chart } from "react-chartjs-2";
import { DialogComponent } from "../DialogComponent/DialogComponent";

import { dialogWindowOpened } from "../../redux/actions/actionCreator";

//    Компонент графика

export const SingleLineChart = ({ data }) => {
   const dispatch = useDispatch();
   //    Получение данных из таблицы для отображения в диалоговом окне
   const csvdataWithFilters = useSelector(
      (store) => store?.csv_data_for_filtering_reducer?.csvData
   );

   const dialogOpened = useSelector(
      (store) => store?.dialog_window_is_opened_reducer?.isOpened
   );

   const [dataForDialog, setDataForDialog] = useState();
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
            item["Дата старта"]
               ? item["Дата старта"]
                    .split(" ")[0]
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
         setDataForDialog(removedUndefinedData);
      }
   };

   useEffect(() => {
      dispatch(dialogWindowOpened(true));
   }, [dataForDialog]); // запускаем useEffect при изменении dataForDialog

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

   //    Разметка графика и диалогового окна по нажатии на график

   return (
      <>
         {chartData.labels.length > 0 ? (
            <div className="SessionDashboardComponent__LineChartContainer">
               <Chart type="line" data={chartData} options={options} />
               {dataForDialog && dialogOpened === true ? (
                  <DialogComponent chartData={dataForDialog} />
               ) : null}
            </div>
         ) : (
            <h1 className="Graph__NoDataFoundHeader">No data found</h1>
         )}
      </>
   );
};
