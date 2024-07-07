import { useEffect, useState } from "react";

const Box = ({ createBoxStyle }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    console.log("박스 사이즈 변경!!");
    setStyle(createBoxStyle());
  }, [createBoxStyle]);

  return <div style={style}></div>;
};

export default Box;
