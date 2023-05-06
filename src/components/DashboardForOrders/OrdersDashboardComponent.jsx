import { useSelector } from "react-redux";
import { ConvertedLoadedOrdersDataToDatePriceForGraphs } from "../ConvertLoadedOrdersData/ToDatePriceForOrdersGraphs";
import { ConvertedLoadedOrdersFullDataForPieGraph } from "../ConvertLoadedOrdersData/ConvertedLoadedOrdersFullDataForPieGraph";
import { ConvertedLoadedOrdersDataForPieGraph } from "../ConvertLoadedOrdersData/ConvertedLoadedOrdersDataByIdForPieGraph";
import { SingleLineChart } from "../Graphs/SingleLineChart";
import { MultiLineChart } from "../Graphs/MultiLineChart";
import { PieChart } from "../Graphs/PieChart";

import "./OrdersDashboardComponent.css";

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

   const dataConsumedEnergy = ConvertedLoadedOrdersDataToDatePriceForGraphs(
      csvdataWithFilters,
      "Идентификатор резерва или зарядной сессии",
      "Дата старта",
      "Потреблённая энергия, Вт*ч"
   );

   //    Формирование входных данных для PieChart

   const dataLocationFullPieChart = ConvertedLoadedOrdersFullDataForPieGraph(
      csvdataWithFilters,
      "Название локации"
   );

   //    Формирование входных данных для PieChart

   const dataStationsFullPieChart = ConvertedLoadedOrdersFullDataForPieGraph(
      csvdataWithFilters,
      "Название станции"
   );

   //    Формирование входных данных для PieChart

   const dataErrorStatusFullPieChart = ConvertedLoadedOrdersFullDataForPieGraph(
      csvdataWithFilters,
      "Описание статуса платежа (при ошибке)"
   );

   //    Формирование входных данных для PieChart

   const dataPaymentStatusFullPieChart =
      ConvertedLoadedOrdersFullDataForPieGraph(
         csvdataWithFilters,
         "Статус платежа"
      );

   //    Формирование входных данных для PieChart

   const dataLocationPieChart = ConvertedLoadedOrdersDataForPieGraph(
      csvdataWithFilters,
      "Идентификатор резерва или зарядной сессии",
      "Название локации"
   );

   //    Формирование входных данных для PieChart

   const dataStationsPieChart = ConvertedLoadedOrdersDataForPieGraph(
      csvdataWithFilters,
      "Идентификатор резерва или зарядной сессии",
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
               <div className="OrdersDashboardComponent__block">
                  <h1 className="OrdersDashboardComponent__block_header">
                     Оплаты за период
                  </h1>
                  <MultiLineChart data={ChartGraphDatePriceArray} />
               </div>

               <div className="OrdersDashboardComponent__block">
                  <h1 className="OrdersDashboardComponent__block_header">
                     Потребленная энергия за период
                  </h1>
                  <SingleLineChart data={dataConsumedEnergy} />
               </div>

               <div>
                  <h1>Общий свод</h1>
                  <div className="OrdersDashboardComponent__PieChartsContainer">
                     <div className="OrdersDashboardComponent__PieChartsContainer_PieChart">
                        <h1 className="OrdersDashboardComponent__block_header">
                           Название локации
                        </h1>
                        <PieChart data={dataLocationFullPieChart} />
                     </div>
                     <div className="OrdersDashboardComponent__PieChartsContainer_PieChart">
                        <h1 className="OrdersDashboardComponent__block_header">
                           Название станции
                        </h1>
                        <PieChart data={dataStationsFullPieChart} />
                     </div>
                  </div>

                  <div className="OrdersDashboardComponent__PieChartsContainer">
                     <div className="OrdersDashboardComponent__PieChartsContainer_PieChart">
                        <h1 className="OrdersDashboardComponent__block_header">
                           Описание статуса платежа (при ошибке)
                        </h1>
                        <PieChart data={dataErrorStatusFullPieChart} />
                     </div>
                     <div className="OrdersDashboardComponent__PieChartsContainer_PieChart">
                        <h1 className="OrdersDashboardComponent__block_header">
                           Статус платежа
                        </h1>
                        <PieChart data={dataPaymentStatusFullPieChart} />
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
                        <PieChart data={dataLocationPieChart} />
                     </div>
                     <div className="OrdersDashboardComponent__PieChartsContainer_PieChart">
                        <h1 className="OrdersDashboardComponent__block_header">
                           Название станции
                        </h1>
                        <PieChart data={dataStationsPieChart} />
                     </div>
                  </div>
               </div>
            </>
         ) : null}
      </>
   );
};
