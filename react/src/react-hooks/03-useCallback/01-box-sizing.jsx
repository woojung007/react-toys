import { useCallback, useState } from "react";
import Box from "./01-Box";

const UseCallbackPage = () => {
  const [size, setSize] = useState(100);
  const [isDark, setIsDark] = useState(false);

  // 박스 크기가 아닌 테마를 바꿔도 state가 변경되기 때문에 useEffect가 실행된다.
  // 이때 useCallback Hook을 사용해서 createBoxStyle 함수를 감싸준다.
  // 그러면 size가 변경되지 않는 이상 memoize 된 createBoxStyle 함수를 재사용하기 때문에 useEffect가 다시 불리지 않는다.

  // const createBoxStyle = () => {
  //   return {
  //     backgroundColor: "lightblue",
  //     width: `${size}px`,
  //     height: `${size}px`,
  //     marginTop: "20px",
  //   };
  // };

  const createBoxStyle = useCallback(() => {
    return {
      backgroundColor: "lightblue",
      width: `${size}px`,
      height: `${size}px`,
      marginTop: "20px",
    };
  }, [size]);

  return (
    <div
      style={{
        background: isDark ? "#666" : "white",
      }}
    >
      <input
        type="number"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />

      <button onClick={() => setIsDark(!isDark)}>Change Theme</button>
      <Box createBoxStyle={createBoxStyle} />
    </div>
  );
};

export default UseCallbackPage;
