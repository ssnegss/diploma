import "chart.js/auto";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Chart } from "react-chartjs-2";
import { DialogComponent } from "../DialogComponent/DialogComponent";

//    Компонент графика

export const SingleLineChart = ({ data }) => {
   //    Получение данных из таблицы для отображения в диалоговом окне
   const csvdataWithFilters = useSelector(
      (store) => store?.csv_data_for_filtering_reducer?.csvData
   );

   const [dataForDialog, setDataForDialog] = useState();
   const [dialogIsOpened, setDialogIsOpened] = useState(false);
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
         setDataForDialog(graphDate);

         const filteredData = csvdataWithFilters.filter(
            (item) =>
               item["Дата старта"]
                  .split(" ")[0]
                  .split(".")
                  .reverse()
                  .join("-") === graphDate
         );
         console.log(filteredData);
         setDataForDialog(filteredData);
         setDialogIsOpened(true);
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

   //    Формирование заголовка таблицы для диалогового окна

   const tableHeadArray = Object.keys(csvdataWithFilters[0] || {}).map(
      (item) => {
         return item;
      }
   );
   const tableHead = tableHeadArray.map((name) => {
      return {
         header: name,
         accessorKey: name,
      };
   });

   //    Разметка графика и диалогового окна по нажатии на график

   return (
      <>
         {chartData.labels.length > 0 ? (
            <div className="SessionDashboardComponent__LineChartContainer">
               <Chart type="line" data={chartData} options={options} />
               <DialogComponent
                  dialogIsOpened={dialogIsOpened}
                  columns={tableHead}
                  rows={dataForDialog}
               />
            </div>
         ) : (
            <h1 className="Graph__NoDataFoundHeader">No data found</h1>
         )}
      </>
   );
};
