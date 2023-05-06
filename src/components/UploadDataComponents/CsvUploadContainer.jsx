import { useState } from "react";
import { useDispatch } from "react-redux";

import {
   saveCsvData,
   dataIsUploaded,
   showButtonIsPressed,
} from "../../redux/actions/actionCreator";

import Button from "@mui/material/Button";

export const CsvUploadContainer = () => {
   const [file, setFile] = useState();
   const [showButtonVisible, setShowButtonVisible] = useState(0);
   const [fileName, setFileName] = useState("");

   const dispatch = useDispatch();

   const fileReader = new FileReader();

   //    Загрузка выбранного файла. Если формат файла == .csv, отображается кнопка "Отобразить в таблице".
   //    Если формат другой, всплывает окно, что файл не загружен.

   const handleOnChange = (e) => {
      setFile(e.target.files[0]);
      if (
         (e.target.files[0].name.substring(
            e.target.files[0].name.lastIndexOf(".") + 1,
            e.target.files[0].name.length
         ) || e.target.files[0].name) === "csv"
      ) {
         setShowButtonVisible(1);
         dispatch(dataIsUploaded(0));
         dispatch(showButtonIsPressed(0));
         setFileName(e.target.files[0].name);
      } else {
         setShowButtonVisible(0);
         setFileName("");
         dispatch(dataIsUploaded(0));
         setTimeout(() => alert("Файл не загружен"), 100);
      }
   };

   //    Конвертирование полученного файла .csv в массив

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

      dispatch(saveCsvData(array));
   };

   //    По нажатии на кнопку "Отобразить в таблице" загруженный файл конвертируется в массив,
   //    Флаг, сигнализирующий о том, что данные получены и сконвертированы, = 1

   const handleOnSubmit = (e) => {
      e.preventDefault();

      if (file) {
         fileReader.onload = function (event) {
            const text = event.target.result;
            csvFileToArray(text);
            dispatch(dataIsUploaded(1));
         };

         fileReader.readAsText(file);
      }
   };

   //    Разметка
   //    Кнопки "Выбрать файл", "Отобразить в таблице"
   //    Отображение имени загруженного файла

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
         </div>
      </>
   );
};
