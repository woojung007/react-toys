export const setViewHeight = () => {
  setVh();
  window.addEventListener("resize", () => {
    setVh();
  });
};

const setVh = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
