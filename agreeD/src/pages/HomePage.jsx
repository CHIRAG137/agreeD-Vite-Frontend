import React from "react";
import HeroSection from "../components/HomePage/sections/HeroSection";
import Footer from "../components/HomePage/footer/Footer";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div style={{ backgroundColor: "#000" }}>
      <HeroSection />
      <Footer />
    </div>
  );
};

export default HomePage;
