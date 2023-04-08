import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { TrainModel } from "./ModelTrainer";
import ChartComponent from "../PredictionVisualizationComponent/PredictionChartComponent";

export const PredictComponent = ({ model, numDays }) => {
   const [predictions, setPredictions] = useState([]);

   const predict = () => {
      if (!model) return;

      const inputData = Array.from({ length: numDays }, (_, i) => i + 1);
      const inputTensor = tf.tensor(inputData);
      const outputTensor = model.predict(inputTensor);
      const predictions = Array.from(outputTensor.dataSync());
      setPredictions(predictions);
   };

   return (
      <>
         <button onClick={predict}>Predict</button>
         <ul>
            {predictions.map((value, index) => (
               <li key={index}>{`Day ${index + 1}: ${value}`}</li>
            ))}
         </ul>
      </>
   );
};
