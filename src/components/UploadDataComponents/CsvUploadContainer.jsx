import { useState } from "react";
import { useDispatch } from "react-redux";

import { ButtonComponent } from "../ButtonComponent/ButtonComponent";

import {
   saveCsvData,
   dataIsUploaded,
   showButtonIsPressed,
} from "../../redux/actions/actionCreator";

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
         dispatch(dataIsUploaded(false));
         dispatch(showButtonIsPressed(false));
         setFileName(e.target.files[0].name);
      } else {
         setShowButtonVisible(0);
         setFileName("");
         dispatch(dataIsUploaded(false));
         setTimeout(() => alert("Файл не загружен"), 100);
      }
   };

   //    Конвертирование полученного файла .csv в массив

   const csvFileToArray = (string) => {
      const csvHeader = string.slice(0, string.indexOf("\n")).split(";");
      const filteredCvsHeader = csvHeader.filter((item) => item !== "");
      const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

      const array = csvRows
         .map((i) => {
            const values = i.split(";");

            const obj = filteredCvsHeader.reduce((object, header, index) => {
               object[header] = values[index];

               return object;
            }, {});
            if (Object.values(obj).every((value) => value !== undefined)) {
               return obj;
            } else {
               return null; // Проверка, чтобы убрать пустые объекты
            }
         })
         .filter((obj) => obj !== null);
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
            dispatch(dataIsUploaded(true));
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
               <input
                  hidden
                  id={"csvFileInput"}
                  accept={".csv"}
                  type={"file"}
                  onChange={handleOnChange}
               />
               <label
                  className="CsvPageComponent__container_label"
                  htmlFor="csvFileInput"
               >
                  Выбрать файл
               </label>
               <div>
                  <p className="CsvPageComponent__container_fileName">
                     {fileName}
                  </p>
               </div>
               {showButtonVisible ? (
                  <ButtonComponent
                     name="Отобразить в таблице"
                     onClick={(e) => {
                        handleOnSubmit(e);
                     }}
                  ></ButtonComponent>
               ) : null}
            </form>
         </div>
      </>
   );
};
