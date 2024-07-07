import { useState } from "react";
import Page from "./page";
import { ThemeContext } from "./Context/themeContext";
import { UserContext } from "./Context/userContext";

const UseContextPage = () => {
  const [isDark, setIsDark] = useState(false);
  return (
    <UserContext.Provider value={"사용자"}>
      <ThemeContext.Provider value={{ isDark, setIsDark }}>
        <Page />
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
};

export default UseContextPage;
