import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveCsvData } from "../../redux/actions/actionCreator";
import { TableComponent } from "../TableComponent/SortableTableComponent";
import { PredictionComponent } from "../PredictionVisualizationComponent/PredictionComponent";

import Button from "@mui/material/Button";

export const CsvUploadContainerComponent = () => {
   const [file, setFile] = useState();
   const [array, setArray] = useState([]);
   const [tableVisible, setTableVisible] = useState(0);
   const [showButtonVisible, setShowButtonVisible] = useState(0);
   const [fileName, setFileName] = useState("");

   const csvData = useSelector((store) => store?.csv_data_reducer?.csvData);
   const dispatch = useDispatch();

   const fileReader = new FileReader();

   const handleOnChange = (e) => {
      setFile(e.target.files[0]);
      if (
         (e.target.files[0].name.substring(
            e.target.files[0].name.lastIndexOf(".") + 1,
            e.target.files[0].name.length
         ) || e.target.files[0].name) === "csv"
      ) {
         setShowButtonVisible(1);
         setFileName(e.target.files[0].name);
      } else {
         setShowButtonVisible(0);
         setFileName("");
         setTableVisible(0);
         setTimeout(() => alert("Файл не загружен"), 100);
      }
   };

   const csvFileToArray = (string) => {
      const csvHeader = string.slice(0, string.indexOf("\n")).split(";");
      const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

      const array = csvRows.map((i) => {
         const values = i.split(";");
         const obj = csvHeader.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
         }, {});
         return obj;
      });

      setArray(array);
      dispatch(saveCsvData(array));
   };

   const handleOnSubmit = (e) => {
      e.preventDefault();

      if (file) {
         fileReader.onload = function (event) {
            const text = event.target.result;
            csvFileToArray(text);
            setTableVisible(1);
         };

         fileReader.readAsText(file);
      }
   };

   const tableHeadArray = Object.keys(array[0] || {}).map((item) => {
      return item;
   });

   const tableHead = tableHeadArray.map((name) => {
      return {
         header: name,
         accessorKey: name,
      };
   });

   const tableRows = array;

   return (
      <>
         <div style={{ textAlign: "center" }}>
            <form>
               <Button
                  variant="contained"
                  component="label"
                  sx={{ margin: "10px", fontSize: "0.75rem" }}
               >
                  Выбрать файл
                  <input
                     hidden
                     id={"csvFileInput"}
                     accept={".csv"}
                     type={"file"}
                     onChange={handleOnChange}
                  />
               </Button>
               <div>{fileName}</div>
               {showButtonVisible ? (
                  <Button
                     variant="contained"
                     onClick={(e) => {
                        handleOnSubmit(e);
                     }}
                     sx={{ margin: "10px", fontSize: "0.75rem" }}
                  >
                     Отобразить в таблице
                  </Button>
               ) : null}
            </form>

            {tableVisible ? (
               <>
                  <PredictionComponent />
                  <TableComponent rows={tableRows} columns={tableHead} />
               </>
            ) : null}

            <br />
         </div>
      </>
   );
};
