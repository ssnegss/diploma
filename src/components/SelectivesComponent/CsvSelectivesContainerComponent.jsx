import { useSelector } from "react-redux";

import { SelectActionComponent } from "../SelectActionComponent/SelectActionComponent";
import { CsvUploadContainer } from "../UploadDataComponents/CsvUploadContainer";
import CsvUploadSelective from "../SelectActionComponent/CsvUploadSelective.json";

export const CsvSelectivesContainerComponent = () => {
   //    Компонент с выпадающими списками для выбора вида отчетов, загружаемых вручную:
   //    отчеты по сессиям либо отчеты по заказам

   const dropdownCsvOption = useSelector(
      (store) => store?.dropdownOptionReducer?.csvOption
   );

   //    Разметка

   //    Если выбрано "Загрузить файл .csv", отобразить выпадающий список с вариантами типов загружаемых отчетов.
   //    После выбора типа загружаемых отчетов отображается кнопка загрузки отчета

   return (
      <div className="SelectivesContainerComponent">
         <SelectActionComponent
            elementId="uploadCsvSelect"
            header="Отчеты по:"
            options={CsvUploadSelective}
         />
         {dropdownCsvOption === 0 ? <CsvUploadContainer /> : null}
         {dropdownCsvOption === 1 ? <CsvUploadContainer /> : null}
      </div>
   );
};
