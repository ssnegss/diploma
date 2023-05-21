import { useSelector } from "react-redux";
import { ConvertSessionDataToDatePriceForLineGraph } from "../ConvertLoadedDataFunctions/ConvertLoadedSessionsData/ToDatePriceForSessionsGraphs";
import { ConvertDataForPieGraph } from "../ConvertLoadedDataFunctions/ConvertDataForPieGraph";
import { SingleLineChart } from "../Graphs/SingleLineChart";
import { MultiLineChart } from "../Graphs/MultiLineChart";
import { PieChart } from "../Graphs/PieChart";
import { DialogComponent } from "../DialogComponent/DialogComponent";
import {
   DATE_COLUMN,
   FULL_PRICE,
   CONSUMED_ENERGY_PRICE,
   PAYED_PRICE,
   CONSUMED_ENERGY_VALUE,
   LOCATION_NAME,
   STATION_NAME,
} from "../../constants/index";
import { SaveToPdfComponent } from "../SaveToPdfComponent/SaveToPdfComponent";

import "./SessionDashboartComponent.css";

export const SessionDashboardComponent = () => {
   const csvdataWithFilters = useSelector(
      (store) => store?.dataReducer?.filteredCsvData
   );

   const showGraphs = useSelector((store) => store?.booleanReducer?.showGraphs);

   const dialogOpened = useSelector(
      (store) => store?.booleanReducer?.dialogIsOpened
   );

   const dataForDialog = useSelector((store) => store?.dataReducer?.dialogData);

   //    Формирование входных данных для MultiLineChart

   const dataFullPrice = ConvertSessionDataToDatePriceForLineGraph(
      csvdataWithFilters,
      DATE_COLUMN,
      FULL_PRICE
   );

   const dataConsumedEneryPrice = ConvertSessionDataToDatePriceForLineGraph(
      csvdataWithFilters,
      DATE_COLUMN,
      CONSUMED_ENERGY_PRICE
   );

   const dataPayedPrice = ConvertSessionDataToDatePriceForLineGraph(
      csvdataWithFilters,
      DATE_COLUMN,
      PAYED_PRICE
   );

   //    Формирование входных данных для SingleLineChart

   const dataConsumedEnergy = ConvertSessionDataToDatePriceForLineGraph(
      csvdataWithFilters,
      DATE_COLUMN,
      CONSUMED_ENERGY_VALUE
   );

   //    Формирование входных данных для PieChart

   const dataLocationPieChart = ConvertDataForPieGraph(
      csvdataWithFilters,
      LOCATION_NAME
   );

   //    Формирование входных данных для PieChart

   const dataStationsPieChart = ConvertDataForPieGraph(
      csvdataWithFilters,
      STATION_NAME
   );

   //    Формирование массива с данными для построения MultiLineChart

   const ChartGraphDatePriceArray = [
      dataFullPrice,
      dataConsumedEneryPrice,
      dataPayedPrice,
   ].filter((item) => item !== 0);

   //    Подсчет суммы для отображения

   const countFullValue = (array) => {
      if (array.length > 0) {
         return array.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.value;
         }, 0);
      }
      return 0;
   };

   const lineDataFullPrice = countFullValue(dataFullPrice);
   const lineDataConsumedEneryPrice = countFullValue(dataConsumedEneryPrice);
   const lineDataPayedPrice = countFullValue(dataPayedPrice);
   const lineDataConsumedEnergy = countFullValue(dataConsumedEnergy);

   //    Рендер компонента если нажата кнока "Отобразить графики"

   return (
      <>
         {showGraphs ? (
            <>
               {dataForDialog.length > 0 && dialogOpened === true ? (
                  <DialogComponent chartData={dataForDialog} />
               ) : null}
               <div className="DashboardComponent">
                  <div className="DashboardComponent__priceBlock">
                     <div className="DashboardComponent__priceBlock_priceSubBlock">
                        <p className="DashboardComponent__priceBlock_header">
                           {dataFullPrice.length > 0
                              ? dataFullPrice[0].name
                              : "Не удалось получить данные"}
                        </p>
                        <h1>{lineDataFullPrice.toLocaleString("ru")}</h1>
                     </div>
                     <div className="DashboardComponent__priceBlock_priceSubBlock">
                        <p className="DashboardComponent__priceBlock_header">
                           {dataConsumedEneryPrice.length > 0
                              ? dataConsumedEneryPrice[0].name
                              : "Не удалось получить данные"}
                        </p>
                        <h1>
                           {lineDataConsumedEneryPrice.toLocaleString("ru")}
                        </h1>
                     </div>
                     <div className="DashboardComponent__priceBlock_priceSubBlock">
                        <p className="DashboardComponent__priceBlock_header">
                           {dataPayedPrice.length > 0
                              ? dataPayedPrice[0].name
                              : "Не удалось получить данные"}
                        </p>
                        <h1>{lineDataPayedPrice.toLocaleString("ru")}</h1>
                     </div>
                  </div>
                  <div className="SessionDashboardComponent__block">
                     <h1 className="SessionDashboardComponent__block_header">
                        Оплаты за период
                     </h1>
                     {ChartGraphDatePriceArray.length > 0 ? (
                        <MultiLineChart data={ChartGraphDatePriceArray} />
                     ) : (
                        <h1 className="graph__alert_noDataFound">
                           No data found
                        </h1>
                     )}
                  </div>
                  <div className="DashboardComponent__priceBlock">
                     <div className="DashboardComponent__priceBlock_priceSubBlock">
                        <p className="DashboardComponent__priceBlock_header">
                           {dataConsumedEnergy.length > 0
                              ? dataConsumedEnergy[0].name
                              : "Не удалось получить данные"}
                        </p>
                        <h1>{lineDataConsumedEnergy.toLocaleString("ru")}</h1>
                     </div>
                  </div>
                  <div className="SessionDashboardComponent__block">
                     <h1 className="SessionDashboardComponent__block_header">
                        Потребленная энергия за период
                     </h1>
                     {dataConsumedEnergy !== 0 ? (
                        <SingleLineChart data={dataConsumedEnergy} />
                     ) : (
                        <h1 className="graph__alert_noDataFound">
                           No data found
                        </h1>
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
               </div>
               <SaveToPdfComponent />
            </>
         ) : null}
      </>
   );
};
