import React, { useState, useEffect } from "react";
import DragDropFile from "../components/TemplatePage/DragDropFile";

const PdfPreview = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null); // Track selected tab
  const [coords, setCoords] = useState({ x: 0, y: 0 }); // Store clicked coordinates
  const [showModal, setShowModal] = useState(false); // For modal visibility
  const [tabDetails, setTabDetails] = useState({}); // Store the filled details for the tab
  const [pageNumber, setPageNumber] = useState(1); // Track the page number

  // Handle file upload
  const handleFileUpload = (uploadedFile) => {
    // const uploadedFile = event.target.files[0];
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
    setTabDetails({}); // Reset tab details for a new tab selection
  };

  // Handle click on the PDF preview to get coordinates
  const handleClickOnPdf = (event) => {
    if (selectedTab) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left; // X coordinate relative to the document
      const y = event.clientY - rect.top; // Y coordinate relative to the document
      setCoords({ x, y });
      setShowModal(true); // Show modal when a tab is selected
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
    setSelectedTab(null); // Deselect the tab after saving
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
              onChange={(e) =>
                handleInputChange({ target: { name: "required", value: e.target.checked } })
              }
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
    minHeight: "calc(100vh - 92px)",
    padding: "16px",
    backgroundColor: "#171717",
    color: "#ececec",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "1000px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgb(54, 53, 53)",
    backgroundColor: "#202121",
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
    height: "calc(100vh - 150px)",
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
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "7px",
  };

  const tabButtonStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e5e7eb",
    padding: "8px",
    borderRadius: "8px",
    cursor: "pointer",
    width: "140px",
    textAlign: "center",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#222",
  };

  const selectedTabButtonStyle = {
    ...tabButtonStyle,
    backgroundColor: "orange",
    color: "#000",
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
      {!file ? (
        <DragDropFile handleFileUpload={handleFileUpload} />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            width: "100%",
          }}
        >
          <div style={{ ...cardStyle, maxWidth: "1600px", marginRight: "220px" }}>
            <div
              style={{ position: "relative", ...previewContainerStyle }}
              onClick={handleClickOnPdf} // Verify this matches your function name exactly
            >
              <object data={fileUrl} type="application/pdf" style={objectStyle}>
                <embed src={fileUrl} type="application/pdf" style={objectStyle} />
              </object>
              {/* <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "transparent",
                }}
              /> */}
            </div>
          </div>
          <div
            style={{
              ...cardStyle,
              position: "fixed",
              bottom: "3.5%",
              top: "12.5%",
              right: "16px",
              width: "160px",
              overflowY: "auto",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <label htmlFor="pageNumber">Page Number:</label>
              <input
                id="pageNumber"
                type="number"
                value={pageNumber}
                onChange={handlePageNumberChange}
                style={{
                  marginBottom: "16px",
                  padding: "8px 4px",
                  width: "40px",
                  backgroundColor: "#ccc",
                  borderRadius: "10px",
                }}
                min={1}
                max={1000}
                placeholder="Page #"
              />
            </div>
            <div style={{ ...tabRowStyle }}>
              {tabData.map((tab, index) => (
                <div
                  key={index}
                  style={selectedTab?.name === tab.name ? selectedTabButtonStyle : tabButtonStyle}
                  onClick={() => handleTabClick(tab)}
                >
                  <div style={logoStyle}>{tab.logo}</div>
                  <div>{tab.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ padding: "20px", backgroundColor: "#171717", borderRadius: "8px" }}>
            <h3>{selectedTab?.name}</h3>
            <p>
              Coordinates: X: {coords.x}, Y: {coords.y}
            </p>
            {renderTabFields()}
            <button
              onClick={handleSave}
              style={{
                backgroundColor: "orange",
                padding: "10px 20px",
                color: "#000",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfPreview;
