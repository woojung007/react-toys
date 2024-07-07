import { useEffect } from "react";

const useKakao = () => {
  console.log("Kakao.isInitialized():", window.Kakao.isInitialized());

  // 카카오톡 공유
  const shareKakao = (route: string) => {
    window.Kakao.Share.createDefaultButton({
      container: "#kakaotalk-sharing-btn",
      objectType: "location",
      address: "경기 성남시 분당구 판교역로 166 3층",
      addressTitle: "카카오 판교아지트 카페톡",
      content: {
        title: "신메뉴 출시♥︎ 체리블라썸라떼",
        description: "이번 주는 체리블라썸라떼 1+1",
        imageUrl:
          "http://k.kakaocdn.net/dn/bSbH9w/btqgegaEDfW/vD9KKV0hEintg6bZT4v4WK/kakaolink40_original.png",
        link: {
          // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
          mobileWebUrl: route,
          webUrl: route,
        },
      },
      social: {
        likeCount: 286,
        commentCount: 45,
        sharedCount: 845,
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: route,
            webUrl: route,
          },
        },
      ],
    });
  };

  useEffect(() => {
    if (process.env.REACT_APP_URL) {
      shareKakao(process.env.REACT_APP_URL);
    }
  }, [process.env.REACT_APP_URL]);

  return { shareKakao };
};

export default useKakao;
