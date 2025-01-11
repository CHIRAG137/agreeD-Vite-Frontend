import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadButton = () => {
  const [file, setFile] = useState(null);
  const [emailContent, setEmailContent] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
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
      const response = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setEmailContent(response.data.emailContent);
      extractSubjectAndRecipient(response.data.emailContent);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Extract subject and recipient email from the email content
  const extractSubjectAndRecipient = (emailContent) => {
    const subjectMatch = emailContent.match(/Subject:\s*(.*)/);
    const recipientMatch = emailContent.match(/To:\s*(.*)/);

    if (subjectMatch) {
      setSubject(subjectMatch[1]);
    }

    if (recipientMatch) {
      setRecipientEmail(recipientMatch[1]);
    }
  };

  const handleContentChange = (event) => {
    setEmailContent(event.target.value);
  };

  const handleRecipientEmailChange = (event) => {
    setRecipientEmail(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
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
            <h4>Edit Email Response</h4>

            {/* Recipient Email Address */}
            <label htmlFor="recipientEmail">Recipient Email:</label>
            <input
              type="email"
              id="recipientEmail"
              value={recipientEmail}
              onChange={handleRecipientEmailChange}
              placeholder="Enter recipient email"
            />

            {/* Subject */}
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={handleSubjectChange}
              placeholder="Enter subject"
            />

            {/* Email Content */}
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
                  console.log("Modified recipient email:", recipientEmail);
                  console.log("Modified subject:", subject);
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
