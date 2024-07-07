import { useContext } from "react";
import { ThemeContext } from "./Context/themeContext";
import { UserContext } from "./Context/userContext";

const Content = () => {
  const { isDark } = useContext(ThemeContext);
  const user = useContext(UserContext);
  return (
    <div
      className="content"
      style={{
        backgroundColor: isDark ? "black" : "lightblue",
        color: isDark ? "lightblue" : "black",
      }}
    >
      <p>{user}님, 좋은 하루 되세요.</p>
    </div>
  );
};

export default Content;
