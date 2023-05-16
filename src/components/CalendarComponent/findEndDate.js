import { convertDate } from "../../services/convertDate";
import { DATE_COLUMN } from "../../constants/index";

export const findEndDate = (csvData) => {
   if (csvData.length > 0) {
      let i = 0; // начинаем с первого элемента
      if (csvData[i][DATE_COLUMN] === undefined) {
         // если первый элемент равен undefined
         i++;
         while (i < csvData.length && csvData[i][DATE_COLUMN] === undefined) {
            // пока не достигли конца массива и текущий элемент равен undefined
            i++; // переходим к следующему элементу
         }
      }
      if (i < csvData.length) {
         // если нашли ненулевой элемент
         return convertDate(csvData[i][DATE_COLUMN]);
      } else {
         return null;
      }
   }
};
