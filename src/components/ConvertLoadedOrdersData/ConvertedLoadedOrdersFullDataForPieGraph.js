export const ConvertedLoadedOrdersFullDataForPieGraph = (csvData, column) => {
   const resultData = csvData.map((item) => item[column]);

   const filteredResultData = resultData.filter(
      (item) => item !== "" && item !== undefined
   );

   return filteredResultData;
};
