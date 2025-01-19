import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadButton = () => {
  const [file, setFile] = useState(null);
  const [emailContent, setEmailContent] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [videoStatus, setVideoStatus] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    let intervalId;

    if (videoId) {
      intervalId = setInterval(async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/heygen/video-status?video_id=${videoId}`
          );

          const status = response.data.data.data.status;
          console.log(status)
          setVideoStatus(status);

          if (status === "completed") {
            setVideoUrl(response.data.data.video_url);
            clearInterval(intervalId);
          }
        } catch (error) {
          console.error("Error checking video status:", error);
        }
      }, 5000); // Poll every 5 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [videoId]);

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
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const filePath = response.data.filePath;
      localStorage.setItem("uploadedFilePath", filePath);

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

  const extractSubjectAndRecipient = (emailContent) => {
    const subjectMatch = emailContent.match(/Subject:\s*(.*)/);
    const recipientMatch = emailContent.match(/To:\s*(.*)/);

    if (subjectMatch) setSubject(subjectMatch[1]);
    if (recipientMatch) setRecipientEmail(recipientMatch[1]);
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
        signerName: recipientEmail.split("@")[0], // Using email username as name
        filePath: filePath,
        emailSubject: subject,
        emailContent: emailContent,
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

  const sendWithVideo = async () => {
    try {
      setIsLoading(true);
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
        dimension: { width: 1280, height: 720 },
      };

      const response = await axios.post(
        "http://localhost:3000/api/heygen/create-avatar-video",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      const heygenVideoId = response.data.data.video_id;
      if (heygenVideoId) setVideoId(heygenVideoId);

      alert("Video generated successfully!");
    } catch (error) {
      console.error("Error generating video:", error);
      alert("Error generating video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => setIsModalOpen(false);

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
            {!videoId ? (
              <>
                <h4>Edit Email Response</h4>
                <label htmlFor="recipientEmail">Recipient Email:</label>
                <input
                  type="email"
                  id="recipientEmail"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="Enter recipient email"
                />

                <label htmlFor="subject">Subject:</label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter subject"
                />

                <textarea
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  rows="10"
                  cols="50"
                />

                <div className="modal-actions">
                  <button onClick={closeModal}>Close</button>
                  <button onClick={sendDocumentForSigning}>Send without Video</button>
                  <button onClick={sendWithVideo}>Generate Video</button>
                </div>
              </>
            ) : (
              <>
                {videoStatus === "processing" && (
                  <div className="status-message" style={{color:"black"}}>Video is processing...</div>
                )}
                {videoUrl && (
                  <div className="video-preview">
                    <video src={videoUrl} controls />
                  </div>
                )}
                <div className="modal-actions">
                  <button onClick={sendWithVideo}>Send with Video</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadButton;
