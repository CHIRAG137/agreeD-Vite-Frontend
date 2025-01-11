import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <h2 style={{ color: "white" }}>MyApp</h2>
      </div>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#templates">Templates</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
