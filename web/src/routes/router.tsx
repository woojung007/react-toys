import { createBrowserRouter } from "react-router-dom";
import CkEditorPage from "../pages/CkEditorPage";
import FloorSliderPage from "../pages/FloorSliderPage";
import HtmlPage from "../pages/HtmlPage";
import JavaScriptPage from "../pages/JavaScriptPage";
import SignUpPage from "../pages/SignUpPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CkEditorPage />,
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
