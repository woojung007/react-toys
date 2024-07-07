import React, { useState } from "react";

type LongTouchProps = {
  children: React.ReactElement;
};

export default function LongTouch({ children }: LongTouchProps) {
  const [touchStart, setTouchStart] = useState(false);

  const longClickEvent = (e: any) => {
    console.log("click", e.type);

    if (e.type === "touchstart") {
      setTouchStart(true);
      console.log("touch start 이벤트 동작");
    }

    if (e.type === "click") {
      if (touchStart) {
        return;
      }

      console.log("click event 동작");

      setTouchStart(false);
    }

    // 1. 들어오는대로 state 가 변경된다.
    // 2. click 입장에서 touch 가 진행되었으면 무시되어야 한다.
  };

  return (
    <button onTouchStart={longClickEvent} onClick={longClickEvent}>
      {children}
    </button>
  );
}
