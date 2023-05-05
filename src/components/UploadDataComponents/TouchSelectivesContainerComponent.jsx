import { useSelector } from "react-redux";

import { SelectActionComponent } from "../SelectActionComponent/SelectActionComponent";
import TouchUploadSelective from "../SelectActionComponent/TouchUploadSelective.json";

//    Компонент с выпадающими списками для выбора вида получения данных:
//    вручную либо напрямую из TOUCH

export const TouchSelectivesContainerComponent = () => {
   const dropdownOption = useSelector(
      (store) => store?.dropdownOptionReducer?.dropdownOption
   );

   //    Разметка

   //    Если выбрано "Получение по TOUCH", отобразить выпадающий список с вариантами загрузки данных из TOUCH

   //    Если выбрано "Загрузить файл .csv", отобразить выпадающий список с вариантами типов загружаемых отчетов.
   //    После выбора типа загружаемых отчетов отображается кнопка загрузки отчета

   return (
      <div className="SelectivesContainerComponent">
         <SelectActionComponent
            elementId="reportSelect"
            header="Данные по:"
            options={TouchUploadSelective}
         />
      </div>
   );
};
