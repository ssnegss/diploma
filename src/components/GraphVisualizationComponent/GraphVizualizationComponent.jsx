import { TestLineChart } from "../LineChart/TestChart";
import MultilineChart from "./MultilineChart";
import rd3 from "react-d3-library";
import sess from "../../sess.json";
import { PredictionComponent } from "../PredictionVisualizationComponent/PredictionComponent";

export const Graph = () => {
   const ddd = sess[0]["Дата старта"].split(" ")[0].split(".");
   const strDate = ddd[2] + "-" + ddd[1] + "-" + ddd[0];
   var d = new Date(strDate);


   return (
      <>
         <h1> hello graaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaph</h1>
         <PredictionComponent />
      </>
   );
};
