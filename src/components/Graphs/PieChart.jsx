import "chart.js/auto";
import { useSelector, useDispatch } from "react-redux";
import { Pie } from "react-chartjs-2";
import {
   dialogWindowOpened,
   tableDataForDialog,
} from "../../redux/actions/actionCreator";

export const PieChart = ({ data }) => {
   const dispatch = useDispatch();
   //    Получение данных из таблицы для отображения в диалоговом окне
   const csvdataWithFilters = useSelector(
      (store) => store?.dataReducer?.filteredCsvData
   );

   const labels = Array.from(new Set(data.data)); // получаем уникальные значения из массива
   const counts = labels.map(
      (label) => data.data.filter((item) => item === label).length
   ); // считаем количество каждого значения

   const chartData = {
      labels,
      datasets: [
         {
            data: counts,
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
            hoverBackgroundColor: [
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
      ],
   };

   const handleGraphClick = (e, elements) => {
      if (elements && elements.length > 0) {
         const index = elements[0].index;
         const graphSection = chartData.labels[index]; //  Получение секции кругового графика

         const itemColumn = data.column;

         // Проверка на соответствие нажатой секции

         const filteredData = csvdataWithFilters.filter((item) =>
            item[itemColumn] ? item[itemColumn] === graphSection : undefined
         );

         dispatch(tableDataForDialog(filteredData));
         dispatch(dialogWindowOpened(true));
      }
   };

   const chartOptions = {
      onClick: handleGraphClick,
      plugins: {
         tooltip: {
            titleFont: {
               size: 16,
            },
            bodyFont: { size: 18 }, // изменяем размер текста
         },
         legend: {
            labels: {
               boxHeight: 15, // change label font size here
               font: { size: 18 },
            },
         },
      },
   };

   return (
      <div className="SessionDashboardComponent__PieChartComponent">
         {chartData.labels.length > 0 ? (
            <Pie data={chartData} options={chartOptions} />
         ) : (
            <h1 className="Graph__NoDataFoundHeader">No data found</h1>
         )}
      </div>
   );
};
