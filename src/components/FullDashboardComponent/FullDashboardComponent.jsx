import { useSelector } from "react-redux";
import { TableComponent } from "../TableComponent/SortableTableComponent";
import { SessionDashboardComponent } from "../DashboardForSessions/SessionDashboardComponent";

export const FullDashboardComponent = () => {
   //    Получение загруженных данных

   const csvData = useSelector((store) => store?.csv_data_reducer?.csvData);

   //    Получение флага, отображающего, загружены ли данные

   const dataIsUploaded = useSelector(
      (store) => store?.data_is_uploaded_reducer?.isUploaded
   );

   //    Формирование заголовка таблицы

   const tableHeadArray = Object.keys(csvData[0] || {}).map((item) => {
      return item;
   });

   //    Формирование объектов, формирующих заголовок таблицы, для корректной передачи в комонент таблицы

   const tableHead = tableHeadArray.map((name) => {
      return {
         header: name,
         accessorKey: name,
      };
   });

   //    Получение строк таблицы

   const tableRows = csvData;

   // Разметка
   // Если данные загружены, отображаем таблицу с полученными данными и дэшборд, соответствующий типу загруженного отчета

   return (
      <>
         {dataIsUploaded ? (
            <>
               <SessionDashboardComponent />
               <TableComponent rows={tableRows} columns={tableHead} />
            </>
         ) : null}
      </>
   );
};
