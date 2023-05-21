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
               "#CD5C5C",
               "#191970",
               "#5F9EA0",
               "#7B68EE",
               "#DB7093",
               "#483D8B",
               "#696969",
               "#4B0082",
            ],
            hoverBackgroundColor: [
               "#F08080",
               "#4169E1",
               "#66CDAA",
               "#B0C4DE",
               "#FFB6C1",
               "#6A5ACD",
               "#A9A9A9",
               "#9370DB",
            ],
            borderColor: "#fff",
         },
      ],
   };

   console.log(data)

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
      maintainAspectRatio: true,
      aspectRatio: 2,
      plugins: {
         tooltip: {
            titleFont: {
               size: 16,
            },
            bodyFont: { size: 18 }, // изменяем размер текста
         },
         datalabels: {
            color: "#fff", // Color of the datalabels
            font: {
               size: 16, // Size of the datalabels font
            },
         },
         legend: {
            // position: "right",
            align: "center",
            labels: {
               boxHeight: 15, // change label font size here
               font: { size: 18 },
            },
         },
      },
   };

   const percentages = chartData.labels.map((label, i) => {
      const dataset = chartData.datasets[0];
      const value = dataset.data[i];
      const total = dataset.data.reduce((a, b) => a + b, 0);
      const percentage = ((value / total) * 100).toFixed(2);
      const color = dataset.backgroundColor[i];
      return { label, percentage, color };
   });

   const totalRecords = data.data.length;

   //    График

   return (
      <div className="PieGraph__container">
         <div className="PieGraph__graph">
            <Pie data={chartData} options={chartOptions} />
         </div>
         <div className="PieGraph__info">
            <table className="PieGraph__info_table">
               <thead>
                  <tr>
                     <th>Параметр</th>
                     <th>Кол-во</th>
                     <th>Проценты</th>
                     <th>Общее число записей</th>
                  </tr>
               </thead>
               <tbody>
                  {percentages.map(({ label, percentage, color }, index) => (
                     <tr key={index} >
                        <td>
                           <div
                              style={{ display: "flex", alignItems: "center" }}
                           >
                              <div
                                 style={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: color,
                                    marginRight: "5px",
                                 }}
                              ></div>
                              <span>{label}</span>
                           </div>
                        </td>
                        <td>{`${counts[index]}`}</td>
                        <td>{`${percentage}%`}</td>
                        <td>{totalRecords}</td> {/* Добавленная ячейка */}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};
