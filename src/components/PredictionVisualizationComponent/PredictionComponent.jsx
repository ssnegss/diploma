import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { ModelTrainer } from "../Predictions/ModelTrainer";
import { ConvertedLoadedDataToDatePrice } from "../ConvertLoadedData/ToDatePrice";

import { TrainModelComponent } from "../Predictions/TrainModelComponent";
import { PredictComponent } from "../Predictions/PredictionComponent";
import { ChartComponent } from "./PredictionChartComponent";

export const PredictionComponent = () => {
   const [model, setModel] = useState(null);
   const [predictions, setPredictions] = useState([]);

   const data = ConvertedLoadedDataToDatePrice().map((item) => ({
      x: item.date,
      y: item.price,
   }));
   console.log(data);
   return (
      <div>
         <TrainModelComponent
            data={data}
            onModelTrained={(trainedModel) => setModel(trainedModel)}
         />
         {model && (
            <PredictComponent
               model={model}
               numDays={31}
               onPredictions={(values) => setPredictions(values)} // Метод для передачи прогнозов из PredictComponent в ChartComponent
            />
         )}
         <ChartComponent data={data} predictions={predictions} />
      </div>
   );
};
