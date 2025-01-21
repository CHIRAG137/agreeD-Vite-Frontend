import React, { useState } from "react";
import "./App.css";
import UploadButton from "./components/UploadButton";
import Navbar from "./components/Navbar";
import PdfPreview from "./components/Template";
import Dashboard from "./components/Dashboard";

function App() {
  // State to track the selected page
  const [selectedPage, setSelectedPage] = useState("home");

  // Function to handle page change
  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  return (
    <div className="app">
      <Navbar onPageChange={handlePageChange} />
      <div className="content">
        {selectedPage === "home" && <UploadButton />}
        {selectedPage === "templates" && <PdfPreview />}
        {selectedPage === "dashboard" && <Dashboard />}
      </div>
    </div>
  );
}

export default App;
