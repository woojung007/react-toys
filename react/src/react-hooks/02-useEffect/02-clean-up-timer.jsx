import { useEffect } from "react";

const CleanUp = () => {
  useEffect(() => {
    // 화면이 처음 그려질 때 실행
    const timer = setInterval(() => {
      console.log("타이머 돌아가는 중...");
    }, 1000);

    // 타이머가 끝나도록 clean-up 해주기
    // 화면에서 사라질 때 (Unmount 될 때) 실행
    return () => {
      clearInterval(timer);
      console.log("타이머가 종료되었습니다");
    };
  }, []);

  return (
    <div>
      <span>타이머를 시작합니다. 콘솔을 보세요!</span>
    </div>
  );
};

export default CleanUp;
