import { useState } from "react";

const heavyWork = () => {
  console.log("엄청 무거운 작업!!");
  return ["amy", "john"];
};

const UseStatePage = () => {
  // setState가 일어날 때마다 페이지가 계속해서 새로 랜더링 된다.
  // 만약 컴포넌트 안에서 어떤 무거운 작업을 해야한다면 컴포넌트가 계속해서 다시 렌더링되므로 성능에 굉장히 안 좋을것이다.
  // 그러므로 초기값을 가져올 때 어떤 무거운 작업을 해야한다면 이를 바로 초기값으로 넣는 것이 아니라
  // callback 함수를 사용하면 맨 처음에 페이지가 렌더링될 때만 불러오게 된다.

  const [names, setNames] = useState(() => {
    return heavyWork();
  });

  const [input, setInput] = useState("");

  const onChangeInput = (e) => {
    setInput(e.target.value);
    console.log("input", input);
  };

  const onClickUpload = () => {
    setNames([input, ...names]);
    setInput("");
  };

  const onKeyUpUpload = (e) => {
    if (e.keyCode === 13) {
      setNames([input, ...names]);
      setInput("");
    }
  };

  return (
    <div>
      <input
        type="text"
        onChange={onChangeInput}
        value={input}
        onKeyUp={onKeyUpUpload}
      />
      <button onClick={onClickUpload}>Upload</button>
      {names.map((el, idx) => (
        <p key={idx}>{el}</p>
      ))}
    </div>
  );
};

export default UseStatePage;
