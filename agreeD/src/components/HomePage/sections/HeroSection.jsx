import React from "react";
import "./HeroSection.css";
import UploadButton from "../../UploadButton";

const HeroSection = () => {
  return (
    <main className="hero">
      <p className="date">November 30, 2022</p>
      <h1 className="title">Introducing ChatGPT</h1>
      <div className="ctaButtons">
        <UploadButton />
      </div>
      <p className="description">
        We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue
        format makes it possible for ChatGPT to answer followup questions, admit its mistakes,
        challenge incorrect premises, and reject inappropriate requests.
      </p>
      <p className="description">
        ChatGPT is a sibling model to InstructGPT, which is trained to follow an instruction in a
        prompt and provide a detailed response.
      </p>
      <p className="description">
        We are excited to introduce ChatGPT to get users’ feedback and learn about its strengths and
        weaknesses. During the research preview, usage of ChatGPT is free. Try it now at{" "}
        <a href="https://chatgpt.com" className="descriptionLink">
          chatgpt.com
        </a>
        .
      </p>
    </main>
  );
};

export default HeroSection;
