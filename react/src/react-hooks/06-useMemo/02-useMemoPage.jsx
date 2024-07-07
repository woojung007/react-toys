import { useEffect, useMemo, useState } from "react";

export default function UseMemoPage2() {
  const [number, setNumber] = useState(0);
  const [isKorea, setIsKorea] = useState(true);

  // 객체는 메모리 안에 보관이 되고 객체에는 객체의 주소가 보관된다.
  // 똑같아 보이는 변수가 담겨있는 객체를 비교해보면 안에 내용이 같아도 주소가 다르면 다르다는 결과값이 나온다.

  const location = useMemo(() => {
    return {
      country: isKorea ? "한국" : "외국",
    };
  }, [isKorea]);

  useEffect(() => {
    console.log("useEffect 호출");
    // 뭔가 오래 걸리는 작업..
  }, [location]);
  // 똑같아 보이는 변수여도 참조하고 있는 주소가 바꼈기 때문에 location은 변경이 되었다고 생각한다.

  return (
    <div>
      <h2>하루에 몇끼 먹어요?</h2>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <h2>어느 나라에 있어요?</h2>
      <p>나라 : {location.country}</p>
      <button onClick={() => setIsKorea(!isKorea)}>비행기 타자</button>
    </div>
  );
}
