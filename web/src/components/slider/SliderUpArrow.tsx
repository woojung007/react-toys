/* eslint-disable @typescript-eslint/no-explicit-any */

import { ArrowProps } from "../../types/arrow.type";

// UP 버튼 컴포넌트
const SliderUpArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "gray",
        borderRadius: "50%",
      }}
      onClick={onClick}
    >
      <div>sdf</div>
    </div>
  );
};

export default SliderUpArrow;
