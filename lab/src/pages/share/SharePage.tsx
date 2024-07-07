import BottomSheetModal from "components/modal/bottom-sheet/BottomSheetModal";
import ShareModal from "components/modal/share/ShareModal";
import { useState } from "react";

const SharePage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenSharePopup, setIsOpenSharePopup] = useState(false);

  const openSharePopup = () => {
    setIsOpenSharePopup(true);
  };

  const closeSharePopup = () => {
    setIsOpenSharePopup(false);
  };

  // outside click 분기처리
  const handleOutsideClick = () => {
    if (isOpenSharePopup) {
      // setIsOpenSharePopup(false);
      return;
    }
    setIsOpenModal(false);
    setIsOpenSharePopup(false);
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <button
        className="w-40 h-20"
        onClick={() => {
          setIsOpenModal(!isOpenModal);
        }}
      >
        Modal open!
      </button>

      {/* modal */}
      {isOpenModal && (
        <BottomSheetModal
          closeModal={handleOutsideClick}
          openSharePopup={openSharePopup}
        />
      )}

      {/* 공유하기 팝업 */}
      {isOpenSharePopup && <ShareModal closeModal={closeSharePopup} />}
    </div>
  );
};

export default SharePage;
