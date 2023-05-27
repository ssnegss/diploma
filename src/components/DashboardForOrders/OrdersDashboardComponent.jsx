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

import { SaveToPdfComponent } from "../SaveToPdfComponent/SaveToPdfComponent";
import { PriceComponent } from "../DashboardBlocksComponents/PriceComponent/PriceComponent";
import { LineChartComponent } from "../DashboardBlocksComponents/ChartComponent/LineChartComponent";
import { PieChartComponent } from "../DashboardBlocksComponents/ChartComponent/PieChartComponent";

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
                  <div className="PdfOnePage">
                     <div className="DashboardComponent__priceBlock">
                        <PriceComponent
                           data={dataFullPrice}
                           price={lineDataFullPrice}
                        />
                        <PriceComponent
                           data={dataConsumedEneryPrice}
                           price={lineDataConsumedEneryPrice}
                        />
                        <PriceComponent
                           data={dataPayedPrice}
                           price={lineDataPayedPrice}
                        />
                     </div>
                     <LineChartComponent
                        name={"Оплата за период"}
                        data={ChartGraphDatePriceArray}
                     >
                        <MultiLineChart data={ChartGraphDatePriceArray} />
                     </LineChartComponent>
                  </div>
                  <div className="PdfOnePage">
                     <div className="DashboardComponent__priceBlock">
                        <PriceComponent
                           data={dataConsumedEnergy}
                           price={lineDataConsumedEnergy}
                        />
                     </div>
                     <LineChartComponent
                        name={"Потребленная энергия за период"}
                        data={dataConsumedEnergy}
                     >
                        <SingleLineChart data={dataConsumedEnergy} />
                     </LineChartComponent>
                  </div>
                  <div>
                     <h1>Общий свод</h1>
                     <div className="PdfOnePage">
                        <PieChartComponent
                           name={"Название локации"}
                           data={dataLocationFullPieChart}
                        >
                           <PieChart data={dataLocationFullPieChart} />
                        </PieChartComponent>
                        <PieChartComponent
                           name={"Название станции"}
                           data={dataStationsFullPieChart}
                        >
                           <PieChart data={dataStationsFullPieChart} />
                        </PieChartComponent>
                     </div>
                     <div className="PdfOnePage">
                        <PieChartComponent
                           name={"Описание статуса платежа (при ошибке)"}
                           data={dataErrorStatusFullPieChart}
                        >
                           <PieChart data={dataErrorStatusFullPieChart} />
                        </PieChartComponent>

                        <PieChartComponent
                           name={"Статус платежа"}
                           data={dataPaymentStatusFullPieChart}
                        >
                           <PieChart data={dataPaymentStatusFullPieChart} />
                        </PieChartComponent>
                     </div>
                  </div>
                  <div>
                     <div className="PdfOnePage">
                        <h1>Сессионный свод</h1>
                        <PieChartComponent
                           name={"Название локации"}
                           data={dataLocationPieChart}
                        >
                           <PieChart data={dataLocationPieChart} />
                        </PieChartComponent>
                        <PieChartComponent
                           name={"Название станции"}
                           data={dataStationsPieChart}
                        >
                           <PieChart data={dataStationsPieChart} />
                        </PieChartComponent>
                     </div>
                  </div>
               </div>
               <SaveToPdfComponent />
            </>
         ) : null}
      </>
   );
};
