import React, { useState } from "react";
import axios from "axios";

const UploadButton = () => {
  const [file, setFile] = useState(null);
  const [emailContent, setEmailContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle file upload
  const handleUpload = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log("Uploaded file:", selectedFile.name);
      setFile(selectedFile);
      await uploadFile(selectedFile);
    }
  };

  // Function to send the uploaded file to the API and get the email content
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);

      // Send the file to the backend API
      const response = await axios.post("http://localhost:3000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setEmailContent(response.data.emailContent);
      setIsModalOpen(true); 
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentChange = (event) => {
    setEmailContent(event.target.value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="upload-container">
      <label htmlFor="upload" className="upload-button">
        Upload Document
      </label>
      <input
        type="file"
        id="upload"
        style={{ display: "none" }}
        onChange={handleUpload}
        accept=".pdf,.docx"
      />

      {isLoading && <div className="loading">Uploading...</div>}

      {/* Modal for displaying and editing email content */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Email Response</h2>
            <textarea
              value={emailContent}
              onChange={handleContentChange}
              rows="10"
              cols="50"
            />
            <div className="modal-actions">
              <button onClick={closeModal}>Close</button>
              <button
                onClick={() => {
                  console.log("Modified email content:", emailContent);
                  closeModal();
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadButton;
