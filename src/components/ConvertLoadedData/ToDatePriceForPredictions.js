import { useSelector, useDispatch } from "react-redux";

export const ConvertedLoadedDataToDatePriceForPredictions = () => {
   const csvData = useSelector((store) => store?.csv_data_reducer?.csvData);
   //    const dispatch = useDispatch();

   //   Получаем массив объектов с полями date и prvalueice

   const intermediateData = csvData.map((item) => ({
      date: Number(item["Дата старта"].split(".")[0]),
      value: Number(
         item["Стоимость за потреблённую энергию, Р"].replace(",", ".")
      ),
   }));

   //    Суммируем прибыль за каждый день

   const intermediateData2 = intermediateData.reduce((accumulator, current) => {
      const existingObject = accumulator.find(
         (item) => item.date === current.date
      );
      if (!existingObject) {
         accumulator.push(current);
      } else {
         existingObject.value += current.value;
      }
      return accumulator;
   }, []);

   //   Сортируем массив по возрастанию дат месяца

   const resultData = intermediateData2.sort((a, b) => a.date - b.date);

   return resultData;
};
