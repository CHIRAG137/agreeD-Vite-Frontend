import React, { useState, useEffect } from "react";

const PdfPreview = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);  // Track selected tab
  const [coords, setCoords] = useState({ x: 0, y: 0 });  // Store clicked coordinates
  const [showModal, setShowModal] = useState(false);  // For modal visibility
  const [tabDetails, setTabDetails] = useState({}); // Store the filled details for the tab
  const [pageNumber, setPageNumber] = useState(1);  // Track the page number

  // Handle file upload
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
      const url = URL.createObjectURL(uploadedFile);
      setFileUrl(url);
    }
  };

  // Handle file button click
  const handleButtonClick = () => {
    document.getElementById("pdf-upload").click();
  };

  // Handle tab selection
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setShowModal(true); // Show modal when a tab is selected
    setTabDetails({});  // Reset tab details for a new tab selection
  };

  // Handle click on the PDF preview to get coordinates
  const handleClickOnPdf = (event) => {
    if (selectedTab) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left; // X coordinate relative to the document
      const y = event.clientY - rect.top;  // Y coordinate relative to the document
      setCoords({ x, y });
    }
  };

  // Handle form input changes for tab-specific details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTabDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle saving the tab position and details
  const handleSave = () => {
    // Store or send tab data to backend as needed
    console.log("Saved tab at:", coords, tabDetails);
    setShowModal(false); // Close the modal after saving
  };

  // Handle page number change
  const handlePageNumberChange = (e) => {
    setPageNumber(Number(e.target.value));
  };

  // Clean up the object URL when the component unmounts
  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  // Modal fields for different tab types
  const renderTabFields = () => {
    switch (selectedTab?.name) {
      case "Signature Tabs":
        return (
          <>
            <label>Signer Name:</label>
            <input
              type="text"
              name="signerName"
              value={tabDetails.signerName || ""}
              onChange={handleInputChange}
            />
          </>
        );
      case "Text Tabs":
        return (
          <>
            <label>Text Value:</label>
            <input
              type="text"
              name="textValue"
              value={tabDetails.textValue || ""}
              onChange={handleInputChange}
            />
            <label>Required:</label>
            <input
              type="checkbox"
              name="required"
              checked={tabDetails.required || false}
              onChange={(e) => handleInputChange({ target: { name: "required", value: e.target.checked } })}
            />
          </>
        );
      case "Date and Time Tabs":
        return (
          <>
            <label>Date Format:</label>
            <input
              type="text"
              name="dateFormat"
              value={tabDetails.dateFormat || ""}
              onChange={handleInputChange}
            />
          </>
        );
      // Add more cases for other tab types like Radio, Checkbox, etc.
      default:
        return null;
    }
  };

  // Style for the components
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "16px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "1000px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const buttonStyle = {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  };

  const previewContainerStyle = {
    width: "100%",
    height: "800px",
    overflow: "hidden",
    backgroundColor: "#f1f5f9",
    borderRadius: "8px",
    position: "relative",
  };

  const objectStyle = {
    width: "100%",
    height: "100%",
    border: "none",
  };

  const tabRowStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "16px",
    gap: "8px",
  };

  const tabButtonStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e5e7eb",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    width: "120px",
    textAlign: "center",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  };

  const selectedTabButtonStyle = {
    ...tabButtonStyle,
    backgroundColor: "#4CAF50", // Green background for selected tab
  };

  const logoStyle = {
    width: "40px",
    height: "40px",
    marginBottom: "8px",
  };

  const tabData = [
    { name: "Signature Tabs", logo: "🖋" },
    { name: "Text Tabs", logo: "🔤" },
    { name: "Date and Time Tabs", logo: "⏳" },
    { name: "Checkboxes", logo: "☑" },
    { name: "Dropdowns", logo: "🔽" },
    { name: "Attachments", logo: "📂" },
    { name: "Payments", logo: "💳" },
    { name: "Advanced Tabs", logo: "🔒" },
  ];

  return (
    <div style={containerStyle}>
      <input
        type="number"
        value={pageNumber}
        onChange={handlePageNumberChange}
        style={{ marginBottom: "16px", padding: "8px", width: "60px" }}
        min={1}
        max={1000}
        placeholder="Page #"
      />
      <div style={tabRowStyle}>
        {tabData.map((tab, index) => (
          <div
            key={index}
            style={selectedTab === tab ? selectedTabButtonStyle : tabButtonStyle}
            onClick={() => handleTabClick(tab)}
          >
            <div style={logoStyle}>{tab.logo}</div>
            <div>{tab.name}</div>
          </div>
        ))}
      </div>
      {!file ? (
        <div style={{ textAlign: "center" }}>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            style={{ display: "none" }}
            id="pdf-upload"
          />
          <button onClick={handleButtonClick} style={buttonStyle}>
            Upload PDF
          </button>
        </div>
      ) : (
        <div style={cardStyle}>
          <div style={previewContainerStyle} onClick={handleClickOnPdf}>
            <object data={fileUrl} type="application/pdf" style={objectStyle}>
              <embed src={fileUrl} type="application/pdf" style={objectStyle} />
            </object>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal" style={{ position: "fixed", top: "0", left: "0", right: "0", bottom: "0", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ padding: "20px", backgroundColor: "#fff", borderRadius: "8px" }}>
            <h3>{selectedTab?.name}</h3>
            <p>Coordinates: X: {coords.x}, Y: {coords.y}</p>
            {renderTabFields()}
            <button onClick={handleSave} style={{ backgroundColor: "#4CAF50", padding: "10px 20px", color: "white", borderRadius: "5px", cursor: "pointer" }}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfPreview;
