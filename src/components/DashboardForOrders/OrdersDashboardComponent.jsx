import { useSelector } from "react-redux";
import { ConvertOrdersDataToDatePriceForLineGraph } from "../ConvertLoadedDataFunctions/ConvertLoadedOrdersData/ToDatePriceForOrdersGraphs";
import { ConvertDataForPieGraph } from "../ConvertLoadedDataFunctions/ConvertDataForPieGraph";
import { ConvertLoadedOrdersDataByIdForPieGraph } from "../ConvertLoadedDataFunctions/ConvertLoadedOrdersData/ConvertedLoadedOrdersDataByIdForPieGraph";
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
   PAYMENT_STATUS,
   PAYMENT_STATUS_DESCRIPTION,
   SESSION_ID,
} from "../../constants/index";

import "./OrdersDashboardComponent.css";

export const OrdersDashboardComponent = () => {
   const csvdataWithFilters = useSelector(
      (store) => store?.dataReducer?.filteredCsvData
   );

   const showGraphs = useSelector((store) => store?.booleanReducer?.showGraphs);

   const dialogOpened = useSelector(
      (store) => store?.booleanReducer?.dialogIsOpened
   );

   const dataForDialog = useSelector((store) => store?.dataReducer?.dialogData);

   //    Формирование входных данных для MultiLineChart

   const dataFullPrice = ConvertOrdersDataToDatePriceForLineGraph(
      csvdataWithFilters,
      SESSION_ID,
      DATE_COLUMN,
      FULL_PRICE
   );

   const dataConsumedEneryPrice = ConvertOrdersDataToDatePriceForLineGraph(
      csvdataWithFilters,
      SESSION_ID,
      DATE_COLUMN,
      CONSUMED_ENERGY_PRICE
   );

   const dataPayedPrice = ConvertOrdersDataToDatePriceForLineGraph(
      csvdataWithFilters,
      SESSION_ID,
      DATE_COLUMN,
      PAYED_PRICE
   );

   //    Формирование входных данных для SingleLineChart

   const dataConsumedEnergy = ConvertOrdersDataToDatePriceForLineGraph(
      csvdataWithFilters,
      SESSION_ID,
      DATE_COLUMN,
      CONSUMED_ENERGY_VALUE
   );

   //    Формирование входных данных для PieChart

   const dataLocationFullPieChart = ConvertDataForPieGraph(
      csvdataWithFilters,
      LOCATION_NAME
   );

   //    Формирование входных данных для PieChart

   const dataStationsFullPieChart = ConvertDataForPieGraph(
      csvdataWithFilters,
      STATION_NAME
   );

   //    Формирование входных данных для PieChart

   const dataErrorStatusFullPieChart = ConvertDataForPieGraph(
      csvdataWithFilters,
      PAYMENT_STATUS_DESCRIPTION
   );

   //    Формирование входных данных для PieChart

   const dataPaymentStatusFullPieChart = ConvertDataForPieGraph(
      csvdataWithFilters,
      PAYMENT_STATUS
   );

   //    Формирование входных данных для PieChart

   const dataLocationPieChart = ConvertLoadedOrdersDataByIdForPieGraph(
      csvdataWithFilters,
      SESSION_ID,
      LOCATION_NAME
   );

   //    Формирование входных данных для PieChart

   const dataStationsPieChart = ConvertLoadedOrdersDataByIdForPieGraph(
      csvdataWithFilters,
      SESSION_ID,
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

   //    Рендер комппонента если нажата кнока "Отобразить графики"

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
                  <div className="OrdersDashboardComponent__block">
                     <h1 className="OrdersDashboardComponent__block_header">
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
                  <div className="OrdersDashboardComponent__block">
                     <h1 className="OrdersDashboardComponent__block_header">
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

                  <div>
                     <h1>Общий свод</h1>
                     <div className="OrdersDashboardComponent__PieChartsContainer">
                        <div className="OrdersDashboardComponent__PieChartsContainer_PieChart">
                           <h1 className="OrdersDashboardComponent__block_header">
                              Название локации
                           </h1>
                           {dataLocationFullPieChart !== 0 ? (
                              <PieChart data={dataLocationFullPieChart} />
                           ) : (
                              <h1 className="graph__alert_noDataFound">
                                 No data found
                              </h1>
                           )}
                        </div>
                        <div className="OrdersDashboardComponent__PieChartsContainer_PieChart">
                           <h1 className="OrdersDashboardComponent__block_header">
                              Название станции
                           </h1>
                           {dataStationsFullPieChart !== 0 ? (
                              <PieChart data={dataStationsFullPieChart} />
                           ) : (
                              <h1 className="graph__alert_noDataFound">
                                 No data found
                              </h1>
                           )}
                        </div>
                     </div>

                     <div className="OrdersDashboardComponent__PieChartsContainer">
                        <div className="OrdersDashboardComponent__PieChartsContainer_PieChart">
                           <h1 className="OrdersDashboardComponent__block_header">
                              Описание статуса платежа (при ошибке)
                           </h1>
                           {dataErrorStatusFullPieChart !== 0 ? (
                              <PieChart data={dataErrorStatusFullPieChart} />
                           ) : (
                              <h1 className="graph__alert_noDataFound">
                                 No data found
                              </h1>
                           )}
                        </div>
                        <div className="OrdersDashboardComponent__PieChartsContainer_PieChart">
                           <h1 className="OrdersDashboardComponent__block_header">
                              Статус платежа
                           </h1>
                           {dataPaymentStatusFullPieChart !== 0 ? (
                              <PieChart data={dataPaymentStatusFullPieChart} />
                           ) : (
                              <h1 className="graph__alert_noDataFound">
                                 No data found
                              </h1>
                           )}
                        </div>
                     </div>
                  </div>

                  <div>
                     <h1>Сессионный свод</h1>
                     <div className="OrdersDashboardComponent__PieChartsContainer">
                        <div className="OrdersDashboardComponent__PieChartsContainer_PieChart">
                           <h1 className="OrdersDashboardComponent__block_header">
                              Название локации
                           </h1>
                           {dataLocationPieChart !== 0 ? (
                              <PieChart data={dataLocationPieChart} />
                           ) : (
                              <h1 className="graph__alert_noDataFound">
                                 No data found
                              </h1>
                           )}
                        </div>
                        <div className="OrdersDashboardComponent__PieChartsContainer_PieChart">
                           <h1 className="OrdersDashboardComponent__block_header">
                              Название станции
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
               </div>
            </>
         ) : null}
      </>
   );
};
