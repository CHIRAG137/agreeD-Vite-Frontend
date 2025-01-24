import React, { useState } from "react";

const DragDropFile = ({ handleFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const containerStyle = {
    border: "2px dashed #d3d3d3",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
    width: "100%",
    height: "200px",
    position: "relative",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    backgroundColor: dragActive ? "#f1f9ff" : "transparent",
    borderColor: dragActive ? "#1a73e8" : "#d3d3d3",
  };

  const hiddenInputStyle = {
    opacity: 0,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    cursor: "pointer",
  };

  const uploadMessageStyle = {
    color: "#666",
    fontSize: "16px",
  };

  const buttonStyle = {
    marginTop: "10px",
    padding: "8px 16px",
    backgroundColor: "#1a73e8",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#155bb5",
  };

  return (
    <div>
      <form
        style={containerStyle}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf"
          style={hiddenInputStyle}
          onChange={(e) => handleFileUpload(e.target.files[0])}
        />
        <div style={uploadMessageStyle}>
          <p>Add a document</p>
          <p>Drag & drop your PDF here.</p>
          <button
            type="button"
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#155bb5")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#1a73e8")}
          >
            Select File
          </button>
        </div>
      </form>
    </div>
  );
};

export default DragDropFile;
