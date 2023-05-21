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
import { PriceComponent } from "../DashboardBlocksComponents/PriceComponent/PriceComponent";
import { LineChartComponent } from "../DashboardBlocksComponents/ChartComponent/LineChartComponent";
import { PieChartComponent } from "../DashboardBlocksComponents/ChartComponent/PieChartComponent";
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
                  <div className="PdfOnePage">
                     {/* <div className="SessionDashboardComponent__PieChartsContainer"> */}
                        <PieChartComponent
                           name={"Активность комплексов за период"}
                           data={dataLocationPieChart}
                        >
                           <PieChart data={dataLocationPieChart} />
                        </PieChartComponent>

                        <PieChartComponent
                           name={"Активность станций за период"}
                           data={dataStationsPieChart}
                        >
                           <PieChart data={dataStationsPieChart} />
                        </PieChartComponent>
                     {/* </div> */}
                  </div>
               </div>
               <SaveToPdfComponent />
            </>
         ) : null}
      </>
   );
};
