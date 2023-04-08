import { useSelector, useDispatch } from "react-redux";
import { getDataFromDropdown } from "../../redux/actions/actionCreator";

import { SelectActionComponent } from "../SelectActionComponent/SelectActionComponent";
import { CsvUploadContainer } from "./CsvUploadContainer";

import UploadSelective from "../SelectActionComponent/UploadSelective.json";
import TouchUploadSelective from "../SelectActionComponent/TouchUploadSelective.json";

// Компонент с выпадающими списками для выбора вида получения данных: вручную либо напрямую из TOUCH

export const SelectivesContainerComponent = () => {
   const dropdownOption = useSelector(
      (store) => store?.dropdownOptionReducer?.dropdownOption
   );
   const dispatch = useDispatch();

   // Получаем состояние выпадающего списка с выбором вида получения данных

   const checkUploadSelect = () => {
      dispatch(
         getDataFromDropdown(document.getElementById("uploadSelect").value)
      );
   };

   //    Разметка
   //    Если выбрано "Получение по TOUCH", отобразить второй выпадающий список с вариантами загрузки данных из TOUCh
   //    Если выбратно "Загрузить файл .csv", отобразить контейнер для загрузки файла

   return (
      <div className="SelectivesContainerComponent">
         <SelectActionComponent
            elementId="uploadSelect"
            header="Данные по:"
            options={UploadSelective}
            onChange={checkUploadSelect}
         />{" "}
         {dropdownOption == 0 ? (
            <SelectActionComponent
               elementId="reportSelect"
               header="Данные по:"
               options={TouchUploadSelective}
            />
         ) : null}
         {dropdownOption == 1 ? <CsvUploadContainer /> : null}
      </div>
   );
};
