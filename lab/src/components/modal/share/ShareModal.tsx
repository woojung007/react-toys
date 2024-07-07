/* eslint-disable jsx-a11y/anchor-is-valid */
import useKakao from "hooks/kakao/useKakao";
import OutsideClickHandler from "react-outside-click-handler";

type Props = {
  closeModal: () => void;
};

declare global {
  interface Window {
    Kakao: any;
  }
}

const ShareModal = ({ closeModal }: Props) => {
  useKakao();

  return (
    <div
      style={{
        height: `calc(calc(var(--vh, 1vh) * 100) - 15rem)`,
      }}
      className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-full bg-black border-2 border-green-500 bg-opacity-60"
    >
      <OutsideClickHandler onOutsideClick={closeModal} display="contents">
        <div className="flex items-center justify-center bg-white w-[80%] h-40 rounded-md">
          <div className="flex items-center gap-4">
            <button id="kakaotalk-sharing-btn">
              <img
                src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
                alt="카카오톡 공유 보내기 버튼"
              />
            </button>

            <button className="w-20 h-10">이미지 다운로드</button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default ShareModal;
