import { useSelector } from "react-redux";
import { ConvertedLoadedOrdersDataToDatePriceForGraphs } from "../ConvertLoadedOrdersData/ToDatePriceForOrdersGraphs";
import { ConvertedLoadedDataToLocationsForPieGraph } from "../ConvertLoadedOrdersData/ConvertedLoadedOrdersDataToLocationsForPieGraph";
import { SingleLineChart } from "../Graphs/SingleLineChart";
import { MultiLineChart } from "../Graphs/MultiLineChart";
import { PieChart } from "../Graphs/PieChart";

// import "./SessionDashboartComponent.css";

export const OrdersDashboardComponent = () => {
   const csvdataWithFilters = useSelector(
      (store) => store?.csv_data_for_filtering_reducer?.csvData
   );

   const showGraphs = useSelector(
      (store) => store?.show_graphs_button_is_pressed_reducer?.isPushed
   );

   //    Формирование входных данных для MultiLineChart

   const dataFullPrice = ConvertedLoadedOrdersDataToDatePriceForGraphs(
      csvdataWithFilters,
      "Идентификатор резерва или зарядной сессии",
      "Дата старта",
      "Общая стоимость, Р"
   );

   const dataConsumedEneryPrice = ConvertedLoadedOrdersDataToDatePriceForGraphs(
      csvdataWithFilters,
      "Идентификатор резерва или зарядной сессии",
      "Дата старта",
      "Стоимость за потреблённую энергию, Р"
   );

   const dataPayedPrice = ConvertedLoadedOrdersDataToDatePriceForGraphs(
      csvdataWithFilters,
      "Идентификатор резерва или зарядной сессии",
      "Дата старта",
      "Оплачено, Р"
   );

   //    Формирование входных данных для SingleLineChart

   // const dataConsumedEnergy = ConvertedLoadedOrdersDataToDatePriceForGraphs(
   //    csvdataWithFilters,
   //    "Дата старта",
   //    "Потреблённая энергия, Вт*ч"
   // );

   // //    Формирование входных данных для PieChart

   // const dataLocationPieChart = ConvertedLoadedDataToLocationsForPieGraph(
   //    csvdataWithFilters,
   //    "Название локации"
   // );

   // //    Формирование входных данных для PieChart

   // const dataStationsPieChart = ConvertedLoadedDataToLocationsForPieGraph(
   //    csvdataWithFilters,
   //    "Название станции"
   // );

   //    Формирование массива с данными для построения MultiLineChart

   const ChartGraphDatePriceArray = [
      dataFullPrice,
      dataConsumedEneryPrice,
      dataPayedPrice,
   ];

   console.log(ChartGraphDatePriceArray)

   //    Рендер комппонента если dropdownCsvOption === 0 (В выпадающем списке выбрана загрузка отчета по сессиям)
   //    И если нажата кнока "Отобразить графики"

   return (
      <>
         {showGraphs ? (
            <>
               <h1>Оплаты за период</h1>
               <div className="LineChartContainer">
                  <MultiLineChart data={ChartGraphDatePriceArray} />
               </div>
               {/* <h1>Потребленная энергия за период</h1>
               <div className="LineChartContainer">
                  <SingleLineChart data={dataConsumedEnergy} />
               </div>
               <div className="PieChartsContainer">
                  <div className="PieChart">
                     <h1>Активность комплексов за период</h1>
                     <PieChart data={dataLocationPieChart} />
                  </div>
                  <div className="PieChart">
                     <h1>Активность станций за период</h1>
                     <PieChart data={dataStationsPieChart} />
                  </div>
               </div> */}
            </>
         ) : null}
      </>
   );
};
