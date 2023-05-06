import { useSelector } from "react-redux";
import { ConvertedLoadedDataToDatePriceForSessionsGraphs } from "../ConvertLoadedSessionsData/ToDatePriceForSessionsGraphs";
import { ConvertedLoadedSessionsDataForPieGraph } from "../ConvertLoadedSessionsData/ConvertedLoadedSessionsDataForPieGraph";
import { SingleLineChart } from "../Graphs/SingleLineChart";
import { MultiLineChart } from "../Graphs/MultiLineChart";
import { PieChart } from "../Graphs/PieChart";

import "./SessionDashboartComponent.css";

export const SessionDashboardComponent = () => {
   const csvdataWithFilters = useSelector(
      (store) => store?.csv_data_for_filtering_reducer?.csvData
   );

   const showGraphs = useSelector(
      (store) => store?.show_graphs_button_is_pressed_reducer?.isPushed
   );

   //    Формирование входных данных для MultiLineChart

   const dataFullPrice = ConvertedLoadedDataToDatePriceForSessionsGraphs(
      csvdataWithFilters,
      "Дата старта",
      "Общая стоимость, Р"
   );

   const dataConsumedEneryPrice =
      ConvertedLoadedDataToDatePriceForSessionsGraphs(
         csvdataWithFilters,
         "Дата старта",
         "Стоимость за потреблённую энергию, Р"
      );

   const dataPayedPrice = ConvertedLoadedDataToDatePriceForSessionsGraphs(
      csvdataWithFilters,
      "Дата старта",
      "Оплачено, Р"
   );

   //    Формирование входных данных для SingleLineChart

   const dataConsumedEnergy = ConvertedLoadedDataToDatePriceForSessionsGraphs(
      csvdataWithFilters,
      "Дата старта",
      "Потреблённая энергия, Вт*ч"
   );

   //    Формирование входных данных для PieChart

   const dataLocationPieChart = ConvertedLoadedSessionsDataForPieGraph(
      csvdataWithFilters,
      "Название локации"
   );

   //    Формирование входных данных для PieChart

   const dataStationsPieChart = ConvertedLoadedSessionsDataForPieGraph(
      csvdataWithFilters,
      "Название станции"
   );

   //    Формирование массива с данными для построения MultiLineChart

   const ChartGraphDatePriceArray = [
      dataFullPrice,
      dataConsumedEneryPrice,
      dataPayedPrice,
   ];

   //    Рендер комппонента если dropdownCsvOption === 0 (В выпадающем списке выбрана загрузка отчета по сессиям)
   //    И если нажата кнока "Отобразить графики"

   return (
      <>
         {showGraphs ? (
            <>
               <div className="SessionDashboardComponent__block">
                  <h1 className="SessionDashboardComponent__block_header">
                     Оплаты за период
                  </h1>
                  <MultiLineChart data={ChartGraphDatePriceArray} />
               </div>
               <div className="SessionDashboardComponent__block">
                  <h1 className="SessionDashboardComponent__block_header">
                     Потребленная энергия за период
                  </h1>
                  <SingleLineChart data={dataConsumedEnergy} />
               </div>
               <div className="SessionDashboardComponent__PieChartsContainer">
                  <div className="SessionDashboardComponent__PieChartsContainer_PieChart">
                     <h1 className="SessionDashboardComponent__block_header">
                        Активность комплексов за период
                     </h1>
                     <PieChart data={dataLocationPieChart} />
                  </div>
                  <div className="SessionDashboardComponent__PieChartsContainer_PieChart">
                     <h1 className="SessionDashboardComponent__block_header">
                        Активность станций за период
                     </h1>
                     <PieChart data={dataStationsPieChart} />
                  </div>
               </div>
            </>
         ) : null}
      </>
   );
};
