import { useSelector } from "react-redux";
import { ConvertedLoadedDataToDatePriceForSessionsGraphs } from "../ConvertLoadedDataFunctions/ConvertLoadedSessionsData/ToDatePriceForSessionsGraphs";
import { ConvertedLoadedDataForPieGraph } from "../ConvertLoadedDataFunctions/ConvertedLoadedDataForPieGraph";
import { SingleLineChart } from "../Graphs/SingleLineChart";
import { MultiLineChart } from "../Graphs/MultiLineChart";
import { PieChart } from "../Graphs/PieChart";
import { DialogComponent } from "../DialogComponent/DialogComponent";

import "./SessionDashboartComponent.css";

export const SessionDashboardComponent = () => {
   const csvdataWithFilters = useSelector(
      (store) => store?.csv_data_for_filtering_reducer?.csvData
   );

   const showGraphs = useSelector(
      (store) => store?.show_graphs_button_is_pressed_reducer?.isPushed
   );

   const dialogOpened = useSelector(
      (store) => store?.dialog_window_is_opened_reducer?.isOpened
   );

   const dataForDialog = useSelector(
      (store) => store?.table_data_for_dialog_reducer?.dialogData
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

   const dataLocationPieChart = ConvertedLoadedDataForPieGraph(
      csvdataWithFilters,
      "Название локации"
   );

   //    Формирование входных данных для PieChart

   const dataStationsPieChart = ConvertedLoadedDataForPieGraph(
      csvdataWithFilters,
      "Название станции"
   );

   //    Формирование массива с данными для построения MultiLineChart

   const ChartGraphDatePriceArray = [
      dataFullPrice,
      dataConsumedEneryPrice,
      dataPayedPrice,
   ].filter((item) => item !== 0);

   //    Рендер компонента если нажата кнока "Отобразить графики"

   return (
      <>
         {showGraphs ? (
            <>
               {dataForDialog.length > 0 && dialogOpened === true ? (
                  <DialogComponent chartData={dataForDialog} />
               ) : null}
               <div className="SessionDashboardComponent__block">
                  <h1 className="SessionDashboardComponent__block_header">
                     Оплаты за период
                  </h1>
                  {ChartGraphDatePriceArray.length > 0 ? (
                     <MultiLineChart data={ChartGraphDatePriceArray} />
                  ) : (
                     <h1 className="graph__alert_noDataFound">No data found</h1>
                  )}
               </div>
               <div className="SessionDashboardComponent__block">
                  <h1 className="SessionDashboardComponent__block_header">
                     Потребленная энергия за период
                  </h1>
                  {dataConsumedEnergy !== 0 ? (
                     <SingleLineChart data={dataConsumedEnergy} />
                  ) : (
                     <h1 className="graph__alert_noDataFound">No data found</h1>
                  )}
               </div>
               <div className="SessionDashboardComponent__PieChartsContainer">
                  <div className="SessionDashboardComponent__PieChartsContainer_PieChart">
                     <h1 className="SessionDashboardComponent__block_header">
                        Активность комплексов за период
                     </h1>
                     {dataLocationPieChart !== 0 ? (
                        <PieChart data={dataLocationPieChart} />
                     ) : (
                        <h1 className="graph__alert_noDataFound">
                           No data found
                        </h1>
                     )}
                  </div>
                  <div className="SessionDashboardComponent__PieChartsContainer_PieChart">
                     <h1 className="SessionDashboardComponent__block_header">
                        Активность станций за период
                     </h1>
                     {dataStationsPieChart !== 0 ? (
                        <PieChart data={dataStationsPieChart} />
                     ) : (
                        <h1 className="graph__alert_noDataFound">
                           No data found
                        </h1>
                     )}
                  </div>
               </div>
            </>
         ) : null}
      </>
   );
};
