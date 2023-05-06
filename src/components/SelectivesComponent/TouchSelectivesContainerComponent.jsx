import { useSelector } from "react-redux";

import { SelectActionComponent } from "../SelectActionComponent/SelectActionComponent";
import { TouchUploadContainer } from "../UploadDataComponents/TouchUploadContainer";
import TouchUploadSelective from "../SelectActionComponent/TouchUploadSelective.json";

//    Компонент с выпадающими списками для выбора вида получения данных:
//    вручную либо напрямую из TOUCH

export const TouchSelectivesContainerComponent = () => {
   //    Компонент с выпадающими списками для выбора типа данных, загружаемых из TOUCH:
   //    отчеты по сессиям либо отчеты по заказам

   const dropdownTouchOption = useSelector(
      (store) => store?.dropdownTouchOptionReducer?.dropdownOption
   );

   //    Разметка

   //    Если выбрано "Получение по TOUCH", отобразить выпадающий список с вариантами загрузки данных из TOUCH

   return (
      <div className="SelectivesContainerComponent">
         <SelectActionComponent
            elementId="reportSelect"
            header="Данные по:"
            options={TouchUploadSelective}
         />
         {dropdownTouchOption === 0 ? <TouchUploadContainer /> : null}
         {dropdownTouchOption === 1 ? <TouchUploadContainer /> : null}
      </div>
   );
};
