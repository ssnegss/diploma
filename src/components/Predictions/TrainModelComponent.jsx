import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";

export const TrainModelComponent = ({ data, onModelTrained }) => {
   const [model, setModel] = useState(null);

   const trainModel = async () => {
      // Создайте модель
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
      model.compile({
         loss: "meanSquaredError",
         optimizer: "adam",
      });

      // Обучите модель
      const xs = tf.tensor(data.map((d) => d.x));
      const ys = tf.tensor(data.map((d) => d.y));
      await model.fit(xs, ys, { epochs: 300 });

      setModel(model);
      onModelTrained(model);
      console.log(model);
   };

   return (
      <>
         <button onClick={trainModel}>Train Model</button>
         {model && <span>Model trained!</span>}
      </>
   );
};
