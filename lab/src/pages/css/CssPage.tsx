import { useEffect } from "react";
import "./CssPage.css";
import { setViewHeight } from "utils/vh/setViewHeight";

export default function CssPage() {
  useEffect(() => {
    setViewHeight();
  }, []);

  return (
    <div className="css_page">
      <div className="css_popup">
        <div>You and Me</div>
        <pre className="content">
          {`  When I get home from work \n
          I want to wrap myself around you\n 
          I want to take you and squeeze you \n
          'Til the passion starts to rise I want to \n
          take you to heaven That would make my day complete \n
          But you and me ain't no movie stars \n
          `}
        </pre>

        <div className="button_wrapper">
          <button
            onClick={() => window.location.reload()}
            className="refresh_btn"
          >
            새로고침
          </button>
        </div>
      </div>
    </div>
  );
}
