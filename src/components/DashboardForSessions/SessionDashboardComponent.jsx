import { useSelector } from "react-redux";
import { ConvertedLoadedDataToDatePriceForGraphs } from "../ConvertLoadedData/ToDatePriceForGraphs";
import { ConvertedLoadedDataToLocationsForPieGraph } from "../ConvertLoadedData/ConvertedLoadedDataToLocationsForPieGraph";
import { LineChart } from "../Graphs/LineChart";
import { PieChart } from "../Graphs/PieChart";
// import { DoughnutChart } from "../Graphs/DoughnutChart";

import "./SessionDashboartComponent.css";

export const SessionDashboardComponent = () => {
   const csvdataWithFilters = useSelector(
      (store) => store?.csv_data_for_filtering_reducer?.csvData
   );

   const showGraphs = useSelector(
      (store) => store?.show_graphs_button_is_pressed_reducer?.isPushed
   );

   const dropdownCsvOption = useSelector(
      (store) => store?.dropdownCsvOptionReducer?.dropdownOption
   );

   //    Формирование входных данных для LineChart

   const dataFullPrice = ConvertedLoadedDataToDatePriceForGraphs(
      csvdataWithFilters,
      "Дата старта",
      "Общая стоимость, Р"
   );

   const dataConsumedEneryPrice = ConvertedLoadedDataToDatePriceForGraphs(
      csvdataWithFilters,
      "Дата старта",
      "Стоимость за потреблённую энергию, Р"
   );

   const dataPayedPrice = ConvertedLoadedDataToDatePriceForGraphs(
      csvdataWithFilters,
      "Дата старта",
      "Оплачено, Р"
   );

   const dataConsumedEnergy = ConvertedLoadedDataToDatePriceForGraphs(
      csvdataWithFilters,
      "Дата старта",
      "Потреблённая энергия, Вт*ч"
   );

   // console.log(dataConsumedEnergy);

   //    Формирование входных данных для PieChart

   const dataLocationPieChart = ConvertedLoadedDataToLocationsForPieGraph(
      csvdataWithFilters,
      "Название локации"
   );

   //    Формирование входных данных для PieChart

   const dataStationsPieChart = ConvertedLoadedDataToLocationsForPieGraph(
      csvdataWithFilters,
      "Название станции"
   );

   // const ChartraphDatePriceArray = [
   //    dataFullPrice,
   //    dataConsumedEneryPrice,
   //    dataPayedPrice,
   // ];

   //    Рендер комппонента если dropdownCsvOption === 0 (В выпадающем списке выбрана загрузка отчета по сессиям)
   //    И если нажата кнока "Отобразить графики"

   return (
      <>
         {dropdownCsvOption === 0 && showGraphs ? (
            <>
               <h1>Оплаты за период</h1>
               <div className="LineChartContainer">
                  <LineChart
                     dataFirst={dataFullPrice}
                     dataSecond={dataConsumedEneryPrice}
                     dataThird={dataPayedPrice}
                     // data={ChartraphDatePriceArray}
                  />
               </div>
               <h1>Потребленная энергия за период</h1>
               <div className="LineChartContainer">
                  <LineChart
                     dataFirst={dataConsumedEnergy}
                     dataSecond={dataConsumedEnergy}
                     dataThird={dataConsumedEnergy}
                  />
               </div>
               <div className="PieChartsContainer">
                  <div className="PieChart">
                     <h1>Активность комплексов за период</h1>
                     <PieChart
                        data={dataLocationPieChart}
                        width={100}
                        height={50}
                        options={{ maintainAspectRatio: false }}
                     />
                  </div>
                  <div className="PieChart">
                     <h1>Активность станций за период</h1>
                     <PieChart
                        data={dataStationsPieChart}
                        width={100}
                        height={50}
                        options={{ maintainAspectRatio: false }}
                     />
                  </div>
               </div>
            </>
         ) : null}
      </>
   );
};
