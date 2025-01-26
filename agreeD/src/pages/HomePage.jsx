import React from "react";
import HeroSection from "../components/HomePage/sections/HeroSection";
import Footer from "../components/HomePage/footer/Footer";
import "./HomePage.css";
import Sections from "../components/HomePage/sections/Sections";

const HomePage = () => {
  return (
    <div style={{ backgroundColor: "#000", color: "#ffffff", position: "relative" }}>
      <section id="hero-section">
        <HeroSection />
      </section>
      <Sections />
      <Footer />

      <div
        style={{
          position: "fixed",
          top: "10%",
          left: "2%",
          padding: "20px",
          backgroundColor: "#202121",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <a style={{ color: "#fff" }} href="#hero-section">
          Intro
        </a>
        <a style={{ color: "#fff" }} href="#limitations-section">
          Limitations
        </a>
        <a style={{ color: "#fff" }} href="#iterative-deployment-section">
          Iterative Deployment
        </a>
        <a style={{ color: "#fff" }} href="#setup-section">
          Setup
        </a>
      </div>
    </div>
  );
};

export default HomePage;
