import { RouterProvider } from "react-router-dom";
import { BrowserRouter } from "./components/RoutingComponent/BrowserRouter";
import "./App.css";

function App() {
  return <div className="App">
    <RouterProvider router={BrowserRouter} />
  </div>;
}

export default App;