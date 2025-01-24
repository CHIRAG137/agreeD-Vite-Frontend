// Tooltip.js
import React, { useState } from "react";
import "./Tooltip.css";

const Tooltip = ({ content, direction = "top", delay = 400, children }) => {
  const [active, setActive] = useState(false);
  let timeout;

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div className="Tooltip-Wrapper" onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      {active && <div className={`Tooltip-Tip ${direction}`}>{content}</div>}
    </div>
  );
};

export default Tooltip;
