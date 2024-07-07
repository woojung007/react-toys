import { useEffect, useState } from "react";

const UseEffectPage = () => {
  const [count, setCount] = useState(1);
  const [name, setName] = useState("");

  const onClickCountUp = () => {
    setCount(count + 1);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  // 렌더링 될 때마다 매번 실행
  useEffect(() => {
    console.log("렌더링");
  });

  // 처음 마운팅 됐을 때만 실행
  useEffect(() => {
    console.log("마운팅");
  }, []);

  // 마운트 + count 변화할 때마다 실행
  useEffect(() => {
    console.log("count 변화");
  }, [count]);

  // name 변화할 때마다 실행
  useEffect(() => {
    console.log("name 변화");
  }, [name]);

  return (
    <div>
      <button onClick={onClickCountUp}>Update</button>
      <p>count: {count}</p>
      <input onChange={onChangeName}></input>
      <div>name : {name}</div>
    </div>
  );
};

export default UseEffectPage;
