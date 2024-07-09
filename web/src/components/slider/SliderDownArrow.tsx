/* eslint-disable @typescript-eslint/no-explicit-any */

import { ArrowProps } from "../../types/arrow.type";

// DOWN 버튼 컴포넌트
const SliderDownArrow: React.FC<ArrowProps> = ({
  className,
  style,
  onClick,
}) => {
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
    />
  );
};

export default SliderDownArrow;
