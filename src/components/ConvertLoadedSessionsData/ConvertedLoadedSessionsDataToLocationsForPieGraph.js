export const ConvertedLoadedDataToLocationsForPieGraph = (
   csvData,
   locationColumn
) => {
   const resultData = csvData.map((item) => item[locationColumn]);

   return resultData;
};
