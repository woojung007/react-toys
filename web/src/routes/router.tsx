import { createBrowserRouter } from "react-router-dom";
import HtmlPage from "../pages/HtmlPage";
import FloorSliderPage from "../pages/FloorSliderPage";
import JavaScriptPage from "../pages/JavaScriptPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <JavaScriptPage />,
  },
  {
    path: "/html",
    element: <HtmlPage />,
  },
  {
    path: "/floor-slider",
    element: <FloorSliderPage />,
  },
]);
