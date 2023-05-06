import { useSelector } from "react-redux";
import { TableComponent } from "../TableComponent/SortableTableComponent";
import { SessionDashboardComponent } from "../DashboardForSessions/SessionDashboardComponent";
import { OrdersDashboardComponent } from "../DashboardForOrders/OrdersDashboardComponent";

import "./DashboardComponent.css";

export const FullDashboardComponent = () => {
   //    Получение загруженных данных

   const csvData = useSelector((store) => store?.csv_data_reducer?.csvData);

   //    Получение флага, отображающего, загружены ли данные

   const dataIsUploaded = useSelector(
      (store) => store?.data_is_uploaded_reducer?.isUploaded
   );

   //    Получение флага, отображающего, какой отчет нужно обрабатывать (по сессиям или заказам)

   const dropdownCsvOption = useSelector(
      (store) => store?.dropdownCsvOptionReducer?.dropdownOption
   );

   const dropdownTouchOption = useSelector(
      (store) => store?.dropdownTouchOptionReducer?.dropdownOption
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
               {dropdownCsvOption === 0 || dropdownTouchOption === 0 ? (
                  <SessionDashboardComponent />
               ) : null}
               {dropdownCsvOption === 1 || dropdownTouchOption === 1 ? (
                  <OrdersDashboardComponent />
               ) : null}
               <div className="DashboardComponent__table">
                  <TableComponent rows={tableRows} columns={tableHead} />
               </div>
            </>
         ) : null}
      </>
   );
};
