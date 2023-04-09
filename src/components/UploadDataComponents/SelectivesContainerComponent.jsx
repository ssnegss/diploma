import { useSelector } from "react-redux";

import { SelectActionComponent } from "../SelectActionComponent/SelectActionComponent";
import { CsvUploadContainer } from "./CsvUploadContainer";

import UploadSelective from "../SelectActionComponent/UploadSelective.json";
import TouchUploadSelective from "../SelectActionComponent/TouchUploadSelective.json";
import CsvUploadSelective from "../SelectActionComponent/CsvUploadSelective.json";

//    Компонент с выпадающими списками для выбора вида получения данных:
//    вручную либо напрямую из TOUCH

export const SelectivesContainerComponent = () => {
   const dropdownOption = useSelector(
      (store) => store?.dropdownOptionReducer?.dropdownOption
   );

   //    Компонент с выпадающими списками для выбора вида отчетов, загружаемых вручную:
   //    отчеты по сессиям либо отчеты по заказам

   const dropdownCsvOption = useSelector(
      (store) => store?.dropdownCsvOptionReducer?.dropdownOption
   );

   //    Разметка

   //    Если выбрано "Получение по TOUCH", отобразить выпадающий список с вариантами загрузки данных из TOUCH

   //    Если выбрано "Загрузить файл .csv", отобразить выпадающий список с вариантами типов загружаемых отчетов.
   //    После выбора типа загружаемых отчетов отображается кнопка загрузки отчета

   return (
      <div className="SelectivesContainerComponent">
         <SelectActionComponent
            elementId="uploadSelect"
            header="Данные по:"
            options={UploadSelective}
         />{" "}
         {dropdownOption === 0 ? (
            <SelectActionComponent
               elementId="reportSelect"
               header="Данные по:"
               options={TouchUploadSelective}
            />
         ) : null}
         {dropdownOption === 1 ? (
            <SelectActionComponent
               elementId="uploadCsvSelect"
               header="Отчеты по:"
               options={CsvUploadSelective}
            />
         ) : null}
         {dropdownCsvOption === 1 || dropdownCsvOption === 0 ? (
            <CsvUploadContainer />
         ) : null}
      </div>
   );
};
