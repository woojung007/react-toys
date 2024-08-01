import TodoApp from "components/data-binding/Paraent";
import FileDropZone from "components/file/drop-zone/FileDropZone";
import FileUpload from "components/file/upload/FileUpload";
import ImageComponent from "components/image/ImageComponent";
import ScreenMode from "components/screen/ScreenOrientation";
import SelectAndUrl from "components/select/SelectAndUrl";
import useNetwork from "hooks/network/useNetwork";
import AntdChartPage from "pages/chart/AntdChartPage";
import CssPage from "pages/css/CssPage";
import InfiniteScrollPage from "pages/infinite-scroll/InfiniteScrollPage";
import MotionPage from "pages/motion/MotionPage";
import MotionPermission from "pages/permission/MotionPermission";
import SharePage from "pages/share/SharePage";
import SwiperPage from "pages/swiper/SwiperPage";
import ThumbnailPage from "pages/thumbnail/ThumbnailPage";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getBrowserLanguage } from "utils/browser/lang/detectBrowserLang";
import { detectBrowserName } from "utils/browser/name/detectBrowserName";
import "./App.css";
import Navigation from "./components/layout/nav/Navigation";
import VideoComponent from "./components/video/VideoComponent";
import LongTouchPage from "./pages/touch/LongTouchPage";

function App() {
  useNetwork();

  useEffect(() => {
    console.log(window.screen.orientation.type);
    detectBrowserName();
    getBrowserLanguage();
  }, []);

  // 카카오 init은 한번만 해야함
  useEffect(() => {
    window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
  }, []);

  return (
    <div className="App">
      <div className="app_body">
        <Routes>
          <Route path="/" element={<MotionPermission />} />
          <Route path="/todo" element={<TodoApp />} />
          <Route path="/share" element={<SharePage />} />
          <Route path="/chart" element={<AntdChartPage />} />
          <Route path="/select-url" element={<SelectAndUrl />} />
          <Route path="/drop-zone" element={<FileDropZone />} />
          <Route path="/file" element={<FileUpload />} />
          <Route path="/motion" element={<MotionPage />} />
          <Route path="/thumbnail" element={<ThumbnailPage />} />
          <Route path="/mode" element={<ScreenMode />} />
          <Route path="/css" element={<CssPage />} />
          <Route path="/long-touch" element={<LongTouchPage />} />
          <Route path="/swiper" element={<SwiperPage />} />
          <Route path="/infinite-scroll" element={<InfiniteScrollPage />} />
          <Route path="/image" element={<ImageComponent />} />
          <Route path="/video" element={<VideoComponent />} />
        </Routes>
      </div>

      <Navigation />
    </div>
  );
}

export default App;
