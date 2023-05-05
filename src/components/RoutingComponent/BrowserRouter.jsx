import {
   createBrowserRouter,
   createRoutesFromElements,
   Route,
} from "react-router-dom";
import { MainPageComponent } from "../../pages/MainPageComponent/MainPageComponent";
import { TouchPageComponent } from "../../pages/TouchPageComponent/TouchPageComponent";
import { CsvPageComponent } from "../../pages/CsvPageComponent/CsvPageComponent";

export const BrowserRouter = createBrowserRouter(
   createRoutesFromElements(
      <Route>
         <Route index element={<MainPageComponent />} />
         <Route path="getFromTouch" element={<TouchPageComponent />} />
         <Route path="getFromCsv" element={<CsvPageComponent />} />
      </Route>
   )
);
