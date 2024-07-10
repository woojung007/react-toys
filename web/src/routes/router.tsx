import { createBrowserRouter } from "react-router-dom";
import HtmlPage from "../pages/HtmlPage";
import FloorSliderPage from "../pages/FloorSliderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HtmlPage />,
  },
  {
    path: "/floor-slider",
    element: <FloorSliderPage />,
  },
]);
