import { useEffect } from "react";
import { setViewHeight } from "utils/vh/setViewHeight";
import LongTouch from "../../components/touch/LongTouch";

export default function LongTouchPage() {
  useEffect(() => {
    setViewHeight();
  }, []);

  return (
    <LongTouch>
      <div className="button_1">button</div>
    </LongTouch>
  );
}
