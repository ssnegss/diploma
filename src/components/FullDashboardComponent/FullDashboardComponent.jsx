import { useDispatch, useSelector } from "react-redux";
import { TableComponent } from "../TableComponent/SortableTableComponent";
import { SessionDashboardComponent } from "../DashboardForSessions/SessionDashboardComponent";
import { OrdersDashboardComponent } from "../DashboardForOrders/OrdersDashboardComponent";

import { CalendarComponent } from "../CalendarComponent/CalendarCompoennt";

import {
   tableDateFrom,
   tableDateTo,
} from "../../redux/actions/actionCreator";

import "./DashboardComponent.css";

export const FullDashboardComponent = () => {
   const dispatch = useDispatch();

   const handleTableDateFrom = (setTableDateFrom) => {
      dispatch(tableDateFrom(setTableDateFrom));
   };
   const handleTableDateTo = (setTableDateTo) => {
      dispatch(tableDateTo(setTableDateTo));
   };

   //    Даты "С" и "По" для формирования данных

   const getTableDatefrom = useSelector(
      (store) => store?.calendarDateReducer?.tableDateFrom
   );
   const getTableDateTo = useSelector(
      (store) => store?.calendarDateReducer?.tableDateTo
   );

   //    Получение загруженных данных

   const csvData = useSelector((store) => store?.dataReducer?.csvData);

   // const [tableRows, setTableRows] = useState(csvData);

   //    Получение флага, отображающего, загружены ли данные

   const dataIsUploaded = useSelector(
      (store) => store?.booleanReducer?.dataIsUploaded
   );

   //    Получение флага, отображающего, какой отчет нужно обрабатывать (по сессиям или заказам)

   const dropdownCsvOption = useSelector(
      (store) => store?.dropdownOptionReducer?.csvOption
   );

   const dropdownTouchOption = useSelector(
      (store) => store?.dropdownOptionReducer?.touchOption
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

   const filterDataByDate = (data) => {
      const dateFrom = new Date(getTableDatefrom).getTime();
      const dateTo = new Date(getTableDateTo).getTime();

      // console.log(getTableDatefrom, getTableDateTo)

      const filteredItems = data.filter((item) => {
         const itemDate = new Date(
            item["Дата старта"].split(" ")[0].split(".").reverse().join("-")
         ).getTime();

         return itemDate >= dateFrom && itemDate <= dateTo;
      });

      // console.log(filteredItems);

      return filteredItems;
   };

   //    Получение строк таблицы

   const tableRows = filterDataByDate(csvData);

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
                  <CalendarComponent
                     dateFrom={handleTableDateFrom}
                     dateTo={handleTableDateTo}
                     isTable={true}
                     // onChange={()=> onResetButtonClick()}
                  />
                  <TableComponent rows={tableRows} columns={tableHead} />
               </div>
            </>
         ) : null}
      </>
   );
};
