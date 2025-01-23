import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="column">
          <div className="columnTitle">Our research</div>
          <a href="#overview" className="link">
            Overview
          </a>
          <a href="#index" className="link">
            Index
          </a>
          <a href="#advancements" className="link">
            Latest advancements
          </a>
          <a href="#gpt4" className="link">
            GPT-4
          </a>
        </div>
        <div className="column">
          <div className="columnTitle">ChatGPT</div>
          <a href="#everyone" className="link">
            For Everyone
          </a>
          <a href="#teams" className="link">
            For Teams
          </a>
          <a href="#enterprises" className="link">
            For Enterprises
          </a>
        </div>
        <div className="column">
          <div className="columnTitle">API</div>
          <a href="#platform" className="link">
            Platform overview
          </a>
          <a href="#pricing" className="link">
            Pricing
          </a>
          <a href="#documentation" className="link">
            Documentation ↗
          </a>
        </div>
        <div className="column">
          <div className="columnTitle">Company</div>
          <a href="#about" className="link">
            About us
          </a>
          <a href="#news" className="link">
            News
          </a>
          <a href="#charter" className="link">
            Our Charter
          </a>
        </div>
        <div className="column">
          <div className="columnTitle">Terms & policies</div>
          <a href="#terms" className="link">
            Terms of use
          </a>
          <a href="#privacy" className="link">
            Privacy policy
          </a>
        </div>
      </div>

      <div className="bottomRow">
        <div className="languageSelector">
          <span>🌍</span> English (US)
        </div>
        <div className="copyright">OpenAI © 2015–2025</div>
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
