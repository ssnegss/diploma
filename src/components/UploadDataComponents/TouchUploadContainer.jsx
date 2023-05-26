import { useSelector, useDispatch } from "react-redux";

import { CalendarComponent } from "../CalendarComponent/CalendarCompoennt";
import { ButtonComponent } from "../ButtonComponent/ButtonComponent";

import {
   saveCsvData,
   dataIsUploaded,
   showButtonIsPressed,
   touchDateFrom,
   touchDateTo,
   tableDateTo,
   tableDateFrom,
} from "../../redux/actions/actionCreator";
import { fetchTouchData } from "../../services/apiInteraction";

export const TouchUploadContainer = () => {
   const dispatch = useDispatch();

   const handleTouchDateFrom = (setTouchDateFrom) => {
      dispatch(touchDateFrom(setTouchDateFrom));
   };

   const handleTouchDateTo = (setTouchDateTo) => {
      dispatch(touchDateTo(setTouchDateTo));
   };

   const dropdownTouchOption = useSelector(
      (store) => store?.dropdownOptionReducer?.touchOption
   );

   //    Даты "С" и "По" для формирования данных

   const getTouchDatefrom = useSelector(
      (store) => store?.calendarDateReducer?.touchDateFrom
   );

   const getTouchDateTo = useSelector(
      (store) => store?.calendarDateReducer?.touchDateTo
   );

   const dateFrom = new Date(getTouchDatefrom).getTime();
   const dateTo = new Date(getTouchDateTo).getTime();

   const removeUndefined = (data) => {
      const result = data.map((item) => {
         if (Object.values(item).every((value) => value === undefined)) {
            return null;
         } else {
            return item; // Проверка, чтобы убрать пустые объекты
         }
      });
      return result;
   };

   //    Обработчик нажатия на кнопку "Загрузить данные"

   async function handleClick() {
      if (dropdownTouchOption === 0) {
         const data = await fetchTouchData(
            "/get_sessions_reports",
            dateFrom,
            dateTo
         );
         const reports_data = data.data;
         const resultData = removeUndefined(reports_data);
         dispatch(saveCsvData(resultData));
      }
      if (dropdownTouchOption === 1) {
         const data = await fetchTouchData(
            "/get_orders_reports",
            dateFrom,
            dateTo
         );
         const reports_data = data.data;
         const resultData = removeUndefined(reports_data);
         dispatch(saveCsvData(resultData));
      }
      dispatch(showButtonIsPressed(false));
      dispatch(dataIsUploaded(true));
      dispatch(tableDateFrom(getTouchDatefrom));
      dispatch(tableDateTo(getTouchDateTo));
   }

   return (
      <>
         <div style={{ textAlign: "center" }}>
            <p className="TouchUploadContainer__header">
               Выберите промежуток времени
            </p>
            <CalendarComponent
               dateFrom={handleTouchDateFrom}
               dateTo={handleTouchDateTo}
            />
            <div className="TouchUploadContainer__button">
               <ButtonComponent name="Загрузить данные" onClick={handleClick} />
            </div>
         </div>
      </>
   );
};
