import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadButton = () => {
  const [file, setFile] = useState(null);
  const [emailContent, setEmailContent] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const savedFilePath = localStorage.getItem("uploadedFilePath");
  //   if (savedFilePath) {
  //     console.log("Retrieved file path from localStorage:", savedFilePath);
  //   }
  // }, []);

  const handleUpload = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log("Uploaded file:", selectedFile.name);
      setFile(selectedFile);
      await uploadFile(selectedFile);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const filePath = response.data.filePath;
      localStorage.setItem("uploadedFilePath", filePath);
      console.log("File path saved in localStorage:", filePath);

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

  const sendDocumentForSigning = async () => {
    try {
      setIsLoading(true);
      
      // Get the file path from localStorage
      const filePath = localStorage.getItem("uploadedFilePath");
      
      if (!filePath) {
        throw new Error("No file path found");
      }

      // Prepare the request payload for DocuSign
      const payload = {
        signerEmail: recipientEmail,
        signerName: recipientEmail.split('@')[0], // Using email username as name
        filePath: filePath,
        emailSubject: subject,
        emailContent: emailContent
      };

      // Call the create-envelope endpoint
      const response = await axios.post(
        "http://localhost:3000/api/docusign/create-envelope",
        payload
      );

      console.log("Document sent for signing:", response.data);
      alert("Document has been sent for signing!");
      closeModal();
    } catch (error) {
      console.error("Error sending document for signing:", error);
      alert("Error sending document for signing. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

  const sendWithVideo = async () => {
    try {
      setIsLoading(true);
  
      // Define the payload
      const payload = {
        video_inputs: [
          {
            character: {
              type: "avatar",
              avatar_id: "Angela-inTshirt-20220820",
              avatar_style: "normal",
            },
            voice: {
              type: "text",
              input_text: emailContent || "Welcome to the HeyGen API!",
              voice_id: "1bd001e7e50f421d891986aad5158bc8",
              speed: 1.1,
            },
          },
        ],
        dimension: {
          width: 1280,
          height: 720,
        },
      };
  
      // Call the video generation API
      const response = await axios.post(
        "http://localhost:3000/api/heygen/create-avatar-video", // Replace with your endpoint
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Video generated successfully:", response.data);
      alert("Video has been generated successfully!");
    } catch (error) {
      console.error("Error generating video:", error);
      alert("Error generating video. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h4>Edit Email Response</h4>

            <label htmlFor="recipientEmail">Recipient Email:</label>
            <input
              type="email"
              id="recipientEmail"
              value={recipientEmail}
              onChange={handleRecipientEmailChange}
              placeholder="Enter recipient email"
            />

            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={handleSubjectChange}
              placeholder="Enter subject"
            />

            <textarea
              value={emailContent}
              onChange={handleContentChange}
              rows="10"
              cols="50"
            />
            <div className="modal-actions">
              <button onClick={closeModal}>Close</button>
              <button onClick={sendDocumentForSigning}>
                Send without Video
              </button>
              <button onClick={sendWithVideo}>
                Send with Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadButton;