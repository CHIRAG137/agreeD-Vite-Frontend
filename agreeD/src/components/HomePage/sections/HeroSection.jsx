import React from "react";
import "./HeroSection.css";
import UploadButton from "../UploadButton";

const HeroSection = () => {
  return (
    <main className="hero">
      <h1 className="title">Introducing AgreeD</h1>
      <div className="ctaButtons">
        <UploadButton />
      </div>
      <p className="description">
        Say goodbye to stalled agreements! Our solution combines personalized
        email drips, automated calls, and a real-time AI video agent to address
        client concerns instantly—making your process smarter, faster, and
        frustration-free.
      </p>
      <p className="description">
      AgreeD leverages the power of DocuSign APIs to create seamless, AI-driven software tailored for nonprofits, automating agreement workflows and simplifying processes—Making the Impossible... Possible by AI-fying the world.
      </p>
    </main>
  );
};

export default HeroSection;
