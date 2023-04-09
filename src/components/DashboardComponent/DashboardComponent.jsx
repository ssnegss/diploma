import { useSelector } from "react-redux";
import { ConvertedLoadedDataToDatePriceForGraphs } from "../ConvertLoadedData/ToDatePriceForGraphs";
import { TableComponent } from "../TableComponent/SortableTableComponent";
import Graph from "../LineChart/Graph";

export const DashboardComponent = () => {
   const csvData = useSelector((store) => store?.csv_data_reducer?.csvData);
   const csvdataWithFilters = useSelector(
      (store) => store?.csv_data_for_filtering_reducer?.csvData
   );
   const showGraphs = useSelector(
      (store) => store?.show_graphs_button_is_pressed_reducer?.isPushed
   );
   const dataIsUploaded = useSelector(
      (store) => store?.data_is_uploaded_reducer?.isUploaded
   );

   const tableHeadArray = Object.keys(csvData[0] || {}).map((item) => {
      return item;
   });

   const tableHead = tableHeadArray.map((name) => {
      return {
         header: name,
         accessorKey: name,
      };
   });

   const tableRows = csvData;
   console.log(dataIsUploaded);

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

   return (
      <>
         {dataIsUploaded ? (
            <>
               {showGraphs ? (
                  <Graph
                     dataFirst={dataFullPrice}
                     dataSecond={dataConsumedEneryPrice}
                     dataThird={dataPayedPrice}
                  />
               ) : null}
               {/* <PredictionComponent /> */}
               <TableComponent rows={tableRows} columns={tableHead} />
            </>
         ) : null}
      </>
   );
};
