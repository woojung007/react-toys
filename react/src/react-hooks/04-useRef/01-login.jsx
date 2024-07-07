import { useEffect, useRef } from "react";

const UseRefPage = () => {
  const inputRef = useRef();

  useEffect(() => {
    console.log(inputRef);
    inputRef.current.focus();
  }, []);

  const onClickLogin = () => {
    alert(`환영합니다 ${inputRef.current.value}!`);
    inputRef.current.focus();
    inputRef.current.value = "";
  };

  const onKeyUpLogin = (event) => {
    if (event.keyCode === 13) {
      onClickLogin();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="username"
        ref={inputRef}
        onKeyUp={onKeyUpLogin}
      />
      <button onClick={onClickLogin}>Login</button>
    </div>
  );
};

export default UseRefPage;
