import { createBrowserRouter } from "react-router-dom";
import FloorSliderPage from "../pages/FloorSliderPage";
import HtmlPage from "../pages/HtmlPage";
import JavaScriptPage from "../pages/JavaScriptPage";
import SignUpPage from "../pages/SignUpPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <JavaScriptPage />,
  },
  {
    path: "/js",
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
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
]);
