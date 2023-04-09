import { useSelector } from "react-redux";
import { ConvertedLoadedDataToDatePriceForGraphs } from "../ConvertLoadedData/ToDatePriceForGraphs";
import ChartGraph from "../Graphs/ChartGraph";

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
               <h1>Прибыль за период</h1>
               <ChartGraph
                  dataFirst={dataFullPrice}
                  dataSecond={dataConsumedEneryPrice}
                  dataThird={dataPayedPrice}
               />
            </>
         ) : null}
      </>
   );
};
