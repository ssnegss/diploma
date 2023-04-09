export const ConvertedLoadedDataToDatePriceForGraphs = (
   csvData,
   dateColumn,
   valueColumn
) => {
   //   Получаем массив объектов с полями date value, name
   const filteredData = csvData.filter((item) => item[valueColumn] !== 0);
   

   const intermediateData = filteredData.map((item) => ({
      date: item[dateColumn].split(" ")[0].split(".").reverse().join("-"),
      price: Number(item[valueColumn].replace(",", ".")),
      name: valueColumn,
   }));

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

   const resultData = intermediateData2.reverse();

   return resultData;
};
