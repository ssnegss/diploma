export const ConvertedLoadedDataToLocationsForPieGraph = (
    csvData,
    locationColumn
 ) => {
 
    const resultData = csvData.map((item) => (
        item[locationColumn]
    ));
 
    // const resultData = intermediateData2.reverse();
 
    return resultData;
 };
 