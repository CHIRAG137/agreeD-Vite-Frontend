import React from "react";
import "./App.css";
import UploadButton from "./components/UploadButton";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="upload-container">
        <UploadButton />
      </div>
    </div>
  );
}

export default App;
