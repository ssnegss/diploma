import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataFromDropdown } from "../../redux/actions/actionCreator";

import { SelectActionComponent } from "../SelectActionComponent/SelectActionComponent";
import { CsvUploadContainerComponent } from "../CsvUploadContainerComponent/CsvUploadContainerComponent";
import UploadSelective from "../SelectActionComponent/UploadSelective.json";
import TouchUploadSelective from "../SelectActionComponent/TouchUploadSelective.json";

import "./SelectContainerComponent.css";

export const SelectivesContainerComponent = () => {
   const dropdownOption = useSelector(
      (store) => store?.dropdownOptionReducer?.dropdownOption
   );
   const dispatch = useDispatch();

   const checkUploadSelect = () => {
      dispatch(
         getDataFromDropdown(document.getElementById("uploadSelect").value)
      );
   };

   return (
      <div className="SelectivesContainerComponent">
         <h1> Selectives container</h1>
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
         {dropdownOption == 1 ? <CsvUploadContainerComponent /> : null}
      </div>
   );
};
