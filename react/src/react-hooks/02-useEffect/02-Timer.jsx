import React, { useState } from "react";
import CleanUp from "./02-clean-up-timer";

const Timer = () => {
  const [showTimer, setShowTimer] = useState(false);
  return (
    <div>
      {showTimer && <CleanUp />}
      <button onClick={() => setShowTimer(!showTimer)}>Toggle Timer</button>
    </div>
  );
};

export default Timer;
