import OutsideClickHandler from "react-outside-click-handler";

type Props = {
  closeModal: () => void;
  openSharePopup: () => void;
};

const BottomSheetModal = ({ closeModal, openSharePopup }: Props) => {
  return (
    // background
    <div
      style={{
        height: `calc(calc(var(--vh, 1vh) * 100) - 15rem)`,
      }}
      className="fixed top-0 left-0 z-40 flex items-end justify-center w-screen h-full bg-black border-2 border-green-500 bg-opacity-60"
    >
      <OutsideClickHandler onOutsideClick={closeModal} display="contents">
        {/* modal */}
        <div className="z-50 flex flex-col items-center justify-center w-full gap-10 h-80 bg-fuchsia-100">
          I am a bottom sheet modal
          <button
            className="w-40 h-20"
            onClick={() => {
              openSharePopup();
            }}
          >
            공유하기
          </button>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default BottomSheetModal;
