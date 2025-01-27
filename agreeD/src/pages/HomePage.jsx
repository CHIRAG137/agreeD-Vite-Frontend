import React from "react";
import HeroSection from "../components/HomePage/sections/HeroSection";
import Footer from "../components/HomePage/footer/Footer";
import "./HomePage.css";
import Sections from "../components/HomePage/sections/Sections";

const HomePage = () => {
  return (
    <div style={{ backgroundColor: "#000", position: "relative" }}>
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
        <a style={{ color: "#fff" }} href="#features-section">
          Key Features
        </a>
        <a style={{ color: "#fff" }} href="#works-section">
          How It Works
        </a>
        <a style={{ color: "#fff" }} href="#demo-section">
          Demo and Showcase
        </a>
        <a style={{ color: "#fff" }} href="#team-section">
          Meet the Team
        </a>
        <a style={{ color: "#fff" }} href="#contact-us-section">
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default HomePage;
