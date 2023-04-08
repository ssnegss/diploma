import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
} from "react-router-dom";
import { MainPageComponent } from "../MainPageComponent/MainPageComponent";
import { Graph } from "../GraphVisualizationComponent/GraphVizualizationComponent";

export const BrowserRouter = createBrowserRouter(
   createRoutesFromElements(
      <Route>
         <Route index element={<MainPageComponent />} />
         {/* <Route path="graph" element={<Graph />} /> */}
      </Route>
   )
);
