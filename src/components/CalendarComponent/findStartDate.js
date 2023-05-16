import { convertDate } from "../../services/convertDate";
import { DATE_COLUMN } from "../../constants/index";

export const findStartDate = (csvData) => {
   if (csvData.length > 0) {
      let i = csvData.length - 1; // начинаем с последнего элемента
      if (csvData[i][DATE_COLUMN] === undefined) {
         // если последний элемент равен undefined
         i--;
         while (i >= 0 && csvData[i][DATE_COLUMN] === undefined) {
            // пока не достигли начала массива и текущий элемент равен undefined
            i--; // переходим к предыдущему элементу
         }
      }
      if (i >= 0) {
         // если нашли ненулевой элемент
         return convertDate(csvData[i][DATE_COLUMN]);
      } else {
         return null;
      }
   }
};
