import sess from "../../sess.json";
import { useSelector, useDispatch } from "react-redux";
import { PredictionComponent } from "../PredictionVisualizationComponent/PredictionComponent";
import { ConvertedLoadedDataToDatePriceForGraphs } from "../ConvertLoadedData/ToDatePriceForGraphs";
import { TableComponent } from "../TableComponent/SortableTableComponent";
import Graph from "../LineChart/Graph";

export const DashboardComponent = () => {
   const csvData = useSelector((store) => store?.csv_data_reducer?.csvData);
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

   // const data = ConvertedLoadedDataToDatePriceForGraphs();

   return (
      <>
         {dataIsUploaded ? (
            <>
               {/* <PredictionComponent /> */}
               <TableComponent rows={tableRows} columns={tableHead} />
            </>
         ) : null}

         {/* <Graph data={data} /> */}
      </>
   );
};
