import { useContext } from "react";
import { ThemeContext } from "./Context/themeContext";
import { UserContext } from "./Context/userContext";

const Header = () => {
  const { isDark } = useContext(ThemeContext);
  const user = useContext(UserContext);

  return (
    <header
      className="header"
      style={{
        backgroundColor: isDark ? "black" : "lightgray",
        color: isDark ? "lightblue" : "black",
      }}
    >
      <h1>Welcome {user}!</h1>
    </header>
  );
};

export default Header;
