import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="bottomRow">
        <div className="languageSelector">
          <span>🌍</span> English (US)
        </div>
        <div className="copyright">AgreeD © 2024–2025</div>
        <div className="socialIcons">
          <a href="#twitter" className="icon">
            ✖
          </a>
          <a href="#youtube" className="icon">
            ▶
          </a>
          <a href="#linkedin" className="icon">
            in
          </a>
          <a href="#github" className="icon">
            ⌘
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
