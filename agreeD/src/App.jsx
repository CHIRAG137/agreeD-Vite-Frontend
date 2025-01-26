import React, { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import PdfPreview from "./pages/Template";
import ContractDetails from "./components/contractDetails/ContractDetails";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/navbar/Navbar";
import FullPageChatbot from "./components/agreeDChatbotPage/FullPageChatbot";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  // State to track the selected page
  const [selectedPage, setSelectedPage] = useState("home");

  // Function to handle page change
  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  if (window.location.pathname.split("/")[1] === "chatbot") {
    console.log(window.location.pathname.split("/")[2]);
    if (window.location.pathname.split("/")[2] === undefined) {
      return <NotFoundPage />;
    }
    return <FullPageChatbot />;
  }

  return (
    <>
      <Navbar onPageChange={handlePageChange} />
      <div className="app">
        <div className="content" style={{ width: "100%" }}>
          {selectedPage === "home" && <HomePage />}
          {selectedPage === "templates" && <PdfPreview />}
          {selectedPage === "dashboard" && <Dashboard handlePageChange={handlePageChange} />}
          {selectedPage.includes("contract-details") && (
            <ContractDetails selectedPage={selectedPage} onPageChange={handlePageChange} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
