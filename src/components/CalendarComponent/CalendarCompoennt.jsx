import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ButtonComponent } from "../ButtonComponent/ButtonComponent";
import { findStartDate } from "./findStartDate";
import { findEndDate } from "./findEndDate";

import { tableDateTo, tableDateFrom } from "../../redux/actions/actionCreator";

import "./CalendarComponent.css";

export const CalendarComponent = ({ dateFrom, dateTo, isTable }) => {
   const dispatch = useDispatch();
   const csvData = useSelector((store) => store?.dataReducer?.csvData);

   //    Получение начальной и конечной дат для таблиц

   const tableStartDate = findStartDate(csvData);
   const tableEndDate = findEndDate(csvData);

   //    Форматирование даты dayjs в стандартный вид (тип - строка YYYY-MM-DD)

   const formatDateToStr = (date) => {
      const finalDateDay =
         dayjs(date).get("date") < 10
            ? "0" + dayjs(date).get("date").toString()
            : dayjs(date).get("date");

      const finalDate =
         dayjs(date).get("year").toString() +
         "-" +
         (dayjs(date).get("month") + 1).toString() +
         "-" +
         finalDateDay;
      return finalDate;
   };

   const startDate = isTable ? dayjs(new Date(tableStartDate)) : dayjs(); // Выставление начальной даты: если работаем с TOUCH - выставляется настоящая дата
   // Если работаем с таблицей отчетов - выставляется дата из отчетного документа
   const endDate = isTable ? dayjs(new Date(tableEndDate)) : dayjs(); // Выставление конечной даты

   const [valueFrom, setValueFrom] = useState(startDate);
   const [valueTo, setValueTo] = useState(endDate);

   useEffect(() => {
      if (isTable) {
         setValueFrom(dayjs(new Date(tableStartDate))); // В табличных полях выставляем полученную дату при изменении даты по TOUCH
         setValueTo(dayjs(new Date(tableEndDate)));
         dateFrom(tableStartDate); // Передаем в dispatch(tableDateFrom())
         dateTo(tableEndDate); // Передаем в dispatch(tableDateTo())
      } else {
         dateFrom(formatDateToStr(valueFrom)); // Передаем в dispatch(touchDateFrom());
         dateTo(formatDateToStr(valueTo)); // Передаем в dispatch(touchDateTo());
      }
   }, [csvData]);

   //    При изменении даты "С"

   const onDateFromChange = (newValueFrom) => {
      const getDateFrom = formatDateToStr(newValueFrom);
      setValueFrom(newValueFrom);
      dateFrom(getDateFrom);
   };

   //    При изменении даты "По"

   const onDateToChange = (newValueTo) => {
      const getDateTo = formatDateToStr(newValueTo);
      setValueTo(newValueTo);
      dateTo(getDateTo);
   };

   //    По сбросу фильтрации по дате возвращаем все значения полей в исходные

   const onResetButtonClick = () => {
      setValueFrom(startDate);
      setValueTo(endDate);
      dispatch(tableDateTo(tableEndDate));
      dispatch(tableDateFrom(tableStartDate));
   };

   //    Компонент для выбора промежутка дат
   //    и дальнейшего отображения данных из TOUCH

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <div className="CalendarComponent__container">
            <div className="CalendarComponent__container_dateField">
               <DatePicker
                  value={valueFrom}
                  format={"DD/MM/YYYY"}
                  onChange={(newValue) => onDateFromChange(newValue)}
               />
            </div>
            <div className="CalendarComponent__container_dateField">
               <DatePicker
                  value={valueTo}
                  format={"DD/MM/YYYY"}
                  onChange={(newValue) => onDateToChange(newValue)}
               />
            </div>
            {isTable && (
               <ButtonComponent
                  name={"Сбросить фильтр по дате"}
                  onClick={() => onResetButtonClick()}
               />
            )}
         </div>
      </LocalizationProvider>
   );
};
