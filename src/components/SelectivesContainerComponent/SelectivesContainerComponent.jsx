import { useState } from "react";
import { SelectActionComponent } from "../SelectActionComponent/SelectActionComponent";
import { CsvUploadContainerComponent } from "../CsvUploadContainerComponent/CsvUploadContainerComponent";
import UploadSelective from "../SelectActionComponent/UploadSelective.json";
import TouchUploadSelective from "../SelectActionComponent/TouchUploadSelective.json";

import "./SelectContainerComponent.css";

export const SelectivesContainerComponent = () => {
   const [reportSelectVisible, setReportSelectVisible] = useState(0);
   const [uploadCsvVisible, setUploadCsvVisible] = useState(0);

   const checkUploadSelect = () => {
      document.getElementById("uploadSelect").value === "0"
         ? setReportSelectVisible(1)
         : setReportSelectVisible(0);
      document.getElementById("uploadSelect").value === "1"
         ? setUploadCsvVisible(1)
         : setUploadCsvVisible(0);
   };

   return (
      <>
         <h1> selectives container</h1>
         <SelectActionComponent
            elementId="uploadSelect"
            header="Данные по:"
            options={UploadSelective}
            onChange={() => checkUploadSelect()}
         />{" "}
         {reportSelectVisible ? (
            <SelectActionComponent
               elementId="reportSelect"
               header="Данные по:"
               options={TouchUploadSelective}
            />
         ) : null}
         {uploadCsvVisible ? <CsvUploadContainerComponent /> : null}
      </>
   );
};
