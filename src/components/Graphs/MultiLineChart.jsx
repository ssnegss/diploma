import "chart.js/auto";
import { useSelector, useDispatch } from "react-redux";
import { Chart } from "react-chartjs-2";
import {
   dialogWindowOpened,
   tableDataForDialog,
} from "../../redux/actions/actionCreator";

export const MultiLineChart = ({ data }) => {
   const dispatch = useDispatch();
   //    Получение данных из таблицы для отображения в диалоговом окне
   const csvdataWithFilters = useSelector(
      (store) => store?.dataReducer?.filteredCsvData
   );

   //    Данные для отображения на графике
   const chartData = {
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

         dispatch(tableDataForDialog(removedUndefinedData));
         dispatch(dialogWindowOpened(true));
      }
   };

   //    Настройки для отображения графика
   const options = {
      maintainAspectRatio: false, // график адаптивен по ширине страницы
      responsive: true,
      aspectRatio: 2,
      onClick: handleGraphClick,
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

   return (
      <div className="SessionDashboardComponent__LineChartContainer">
         {chartData.labels.length > 0 ? (
            <>
               <Chart type="line" data={chartData} options={options} />
            </>
         ) : (
            <h1 className="Graph__NoDataFoundHeader">No data found</h1>
         )}
      </div>
   );
};
