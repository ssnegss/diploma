import { useSelector } from "react-redux";
import { ConvertSessionDataToDatePriceForLineGraph } from "../ConvertLoadedDataFunctions/ConvertLoadedSessionsData/ToDatePriceForSessionsGraphs";
import { ConvertDataForPieGraph } from "../ConvertLoadedDataFunctions/ConvertDataForPieGraph";
import { SingleLineChart } from "../Graphs/SingleLineChart";
import { MultiLineChart } from "../Graphs/MultiLineChart";
import { PieChart } from "../Graphs/PieChart";
import { DialogComponent } from "../DialogComponent/DialogComponent";

import "./SessionDashboartComponent.css";

export const SessionDashboardComponent = () => {
   const csvdataWithFilters = useSelector(
      (store) => store?.dataReducer?.filteredCsvData
   );

   const showGraphs = useSelector(
      (store) => store?.booleanReducer?.showGraphs
   );

   const dialogOpened = useSelector(
      (store) => store?.booleanReducer?.dialogIsOpened
   );

   const dataForDialog = useSelector(
      (store) => store?.dataReducer?.dialogData
   );

   //    Формирование входных данных для MultiLineChart

   const dataFullPrice = ConvertSessionDataToDatePriceForLineGraph(
      csvdataWithFilters,
      "Дата старта",
      "Общая стоимость, Р"
   );

   const dataConsumedEneryPrice =
   ConvertSessionDataToDatePriceForLineGraph(
         csvdataWithFilters,
         "Дата старта",
         "Стоимость за потреблённую энергию, Р"
      );

   const dataPayedPrice = ConvertSessionDataToDatePriceForLineGraph(
      csvdataWithFilters,
      "Дата старта",
      "Оплачено, Р"
   );

   //    Формирование входных данных для SingleLineChart

   const dataConsumedEnergy = ConvertSessionDataToDatePriceForLineGraph(
      csvdataWithFilters,
      "Дата старта",
      "Потреблённая энергия, Вт*ч"
   );

   //    Формирование входных данных для PieChart

   const dataLocationPieChart = ConvertDataForPieGraph(
      csvdataWithFilters,
      "Название локации"
   );

   //    Формирование входных данных для PieChart

   const dataStationsPieChart = ConvertDataForPieGraph(
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
