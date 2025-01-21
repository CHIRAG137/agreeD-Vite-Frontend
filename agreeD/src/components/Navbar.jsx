import React from "react";

const Navbar = ({ onPageChange }) => {
  return (
    <nav className="navbar">
      <div>
        <h2 style={{ color: "white" }}>MyApp</h2>
      </div>
      <ul>
        <li>
          <a href="#home" onClick={() => onPageChange("home")}>
            Home
          </a>
        </li>
        <li>
          <a href="#templates" onClick={() => onPageChange("templates")}>
            Templates
          </a>
        </li>
        <li>
          <a href="#dashboard" onClick={() => onPageChange("dashboard")}>
            Dashboard
          </a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
