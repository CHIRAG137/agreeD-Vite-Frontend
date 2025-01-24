import React from "react";
import "./Navbar.css";

const Navbar = ({ onPageChange }) => {
  return (
    <header className="navbar">
      <div className="logo">AgreeD</div>
      <nav>
        <a href="#home" onClick={() => onPageChange("home")} className="navLink">
          Home
        </a>
        <a href="#dashboard" onClick={() => onPageChange("dashboard")} className="navLink">
          Dashboard
        </a>
        <a href="#templates" onClick={() => onPageChange("templates")} className="navLink">
          Templates
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
