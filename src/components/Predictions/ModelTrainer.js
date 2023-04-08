import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";

export const trainModel = async (inputs, outputs) => {
   const model = tf.sequential();
   model.add(tf.layers.dense({ inputShape: [1], units: 1 }));

   model.compile({
      optimizer: tf.train.adam(),
      loss: tf.losses.meanSquaredError,
   });

   const inputTensor = tf.tensor(inputs, [inputs.length, 1]);
   const outputTensor = tf.tensor(outputs, [outputs.length, 1]);

   await model.fit(inputTensor, outputTensor, { epochs: 100 });

   inputTensor.dispose();
   outputTensor.dispose();

   return model;
};
