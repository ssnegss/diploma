import { useSelector, useDispatch } from "react-redux";

export const ConvertedLoadedDataToDatePriceForGraphs = () => {
   const csvData = useSelector((store) => store?.csv_data_reducer?.csvData);
   //    const dispatch = useDispatch();
   var getDate;

   //   Получаем массив объектов с полями date и price

   const intermediateData = csvData.map((item) => ({
      date: item["Дата старта"].split(" ")[0].split(".").reverse().join("-"),
      price: Number(
         item["Стоимость за потреблённую энергию, Р"].replace(",", ".")
      ),
   }));

   console.log(intermediateData);

   //    Суммируем прибыль за каждый день

   const intermediateData2 = intermediateData.reduce((accumulator, current) => {
      const existingObject = accumulator.find(
         (item) => item.date === current.date
      );
      if (!existingObject) {
         accumulator.push(current);
      } else {
         existingObject.price += current.price;
      }
      return accumulator;
   }, []);

   //   Сортируем массив по возрастанию дат месяца

   const resultData = intermediateData2.sort((a, b) => a.date - b.date);

   return resultData;
};
