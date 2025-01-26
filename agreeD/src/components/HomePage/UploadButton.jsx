import React, { useState, useEffect } from "react";
import axios from "axios";
import Chatbot from "../global/Chatbot";
import { IoMdClose } from "react-icons/io";
import { convertDateFormat } from "../../utils/DateFormatConvert";

const UploadButton = () => {
  const [file, setFile] = useState(null);
  const [emailContent, setEmailContent] = useState("");
  const [extractedPdfContent, setExtractedPdfContent] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [videoStatus, setVideoStatus] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [structuredDetails, setStructuredDetails] = useState({});

  // useEffect(() => {
  //   let intervalId;

  //   if (videoId) {
  //     intervalId = setInterval(async () => {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:3000/api/heygen/video-status?video_id=${videoId}`
  //         );

  //         const status = response.data.data.data.status;
  //         console.log(status);
  //         setVideoStatus(status);

  //         if (status === "completed") {
  //           setVideoUrl(response.data.data.video_url);
  //           clearInterval(intervalId);
  //         }
  //       } catch (error) {
  //         console.error("Error checking video status:", error);
  //       }
  //     }, 5000); // Poll every 5 seconds
  //   }

  //   return () => {
  //     if (intervalId) clearInterval(intervalId);
  //   };
  // }, [videoId]);

  useEffect(() => {
    // Fetch templates when the component mounts
    const fetchTemplates = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/docusign/fetch-templates");
        setTemplates(response.data.templates); // Adjust based on the API response structure
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

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
      const response = await axios.post("http://localhost:3000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const filePath = response.data.filePath;
      localStorage.setItem("uploadedFilePath", filePath);

      const { emailContent, structuredDetails, extractedContent } = response.data;
      setEmailContent(emailContent);
      setExtractedPdfContent(extractedContent);
      setStructuredDetails(structuredDetails || {});
      console.log(structuredDetails);
      extractSubjectAndRecipient(emailContent);
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

      // Step 1: Prepare the payload for creating the video (sendWithVideo)
      const videoPayload = {
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

      // Step 2: Call the Heygen API to create the video
      const videoResponse = await axios.post(
        "http://localhost:3000/api/heygen/create-avatar-video",
        videoPayload,
        { headers: { "Content-Type": "application/json" } }
      );

      const heygenVideoId = videoResponse.data.data.video_id;
      if (!heygenVideoId) {
        throw new Error("Failed to generate video.");
      }

      console.log("Video generated with ID:", heygenVideoId);

      // Step 3: Prepare the payload for creating an envelope (DocuSign)
      const envelopePayload = {
        signerEmail: recipientEmail,
        signerName: recipientEmail.split("@")[0], // Using email username as name
        filePath: filePath,
        emailSubject: subject,
        emailContent: emailContent,
      };

      // Step 4: Call the create-envelope endpoint to create the envelope
      const envelopeResponse = await axios.post(
        "http://localhost:3000/api/docusign/create-envelope",
        envelopePayload
      );

      console.log("Envelope created:", envelopeResponse.data);

      if (!envelopeResponse.data || !envelopeResponse.data.envelopeId) {
        throw new Error("Failed to create envelope. No envelope ID returned.");
      }

      const envelopeId = envelopeResponse.data.envelopeId;

      // Step 5: Prepare the payload for saving data, including video ID
      const savePayload = {
        structuredDetails,
        emailContent,
        subject,
        recipientEmail,
        envelopeId, // Include the envelope ID
        heygenVideoId: heygenVideoId, // Include the video ID
        extractedContent: extractedPdfContent,
      };
      console.log(extractedPdfContent);

      // Step 6: Call the API to save the details in the database
      const saveResponse = await axios.post("http://localhost:3000/api/client/save", savePayload);

      if (saveResponse.data.success) {
        console.log("Details saved successfully:", saveResponse.data.data);

        // Step 7: Call the API to schedule event on google calender in all emails
        await axios.post("http://localhost:3000/api/calender/schedule", {
          emails: structuredDetails.emailAddresses.map((email) => email.email) || [],
          events:
            structuredDetails.dates.map((dateInfo) => {
              return { date: convertDateFormat(dateInfo.dateFormat), type: dateInfo.dateType };
            }) || [],
        });

        alert("Document sent for signing and video generated successfully!");
      } else {
        throw new Error("Failed to save details.");
      }

      closeModal();
    } catch (error) {
      console.error("Error in sendDocumentForSigning:", error);
      alert("An error occurred. Please try again.");
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

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
    setShowTemplateDropdown(false); // Hide dropdown after selection
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="upload-container">
      <div className="ctaButtons">
        {!showTemplateDropdown && (
          <>
            <label htmlFor="upload" className="ctaBtn">
              Upload Document
            </label>
            <input
              type="file"
              id="upload"
              style={{ display: "none" }}
              onChange={handleUpload}
              accept=".pdf,.docx"
            />
            <button onClick={() => setShowTemplateDropdown(true)} className="ctaBtn">
              Use Template
            </button>
          </>
        )}

        {showTemplateDropdown && (
          <select
            onChange={handleTemplateChange}
            value={selectedTemplate}
            className="template-dropdown"
          >
            <option value="">Select a Template</option>
            {templates.map((template) => (
              <option key={template.templateId} value={template.templateId}>
                {template.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <input
        type="file"
        id="upload"
        style={{ display: "none" }}
        onChange={handleUpload}
        accept=".pdf,.docx"
      />

      {isLoading && (
        <div className="loading" style={{ color: "orange" }}>
          Uploading...
        </div>
      )}

      {/* Display email input when a template is selected */}
      {selectedTemplate && (
        <div className="email-section">
          <h4>Enter Email Details</h4>
          <label htmlFor="recipientEmail">Recipient Email:</label>
          <input
            type="email"
            id="recipientEmail"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            placeholder="Enter recipient email"
          />
        </div>
      )}

      {isModalOpen && (
        <Chatbot
          style={{ zIndex: "9999" }}
          pdfText={`extracted Pdf Content: ${extractedPdfContent} /n  email content: ${emailContent}`}
        />
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="row">
              <div className="details-column">
                {structuredDetails && (
                  <>
                    <label>Client Name:</label>
                    <input
                      type="text"
                      value={structuredDetails.clientName || ""}
                      onChange={(e) =>
                        setStructuredDetails({
                          ...structuredDetails,
                          clientName: e.target.value,
                        })
                      }
                    />
                    <label>Contact Person:</label>
                    <input
                      type="text"
                      value={structuredDetails.contactPerson || ""}
                      onChange={(e) =>
                        setStructuredDetails({
                          ...structuredDetails,
                          contactPerson: e.target.value,
                        })
                      }
                    />
                    <label>Dates</label>
                    <div
                      style={{
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "20px",
                        borderLeft: "3px solid red",
                      }}
                    >
                      {structuredDetails.dates &&
                        structuredDetails.dates.map((dateObj, index) => (
                          <div
                            key={`date-${index}`}
                            style={{
                              display: "flex",
                              flexDirection: "row", // Change to column layout
                              marginBottom: "20px", // Optional for spacing between groups
                              position: "relative",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                            }}
                          >
                            <div style={{ width: "100%" }}>
                              <input
                                type="text"
                                placeholder="Date"
                                style={{
                                  width: "95%",
                                  backgroundColor: "transparent",
                                  border: "none",
                                  borderRadius: "0",
                                  padding: "10px",
                                  margin: "0",
                                }}
                                value={dateObj.dateFormat}
                                onChange={(e) => {
                                  const updatedDates = [...structuredDetails.dates];
                                  updatedDates[index].dateFormat = e.target.value;
                                  setStructuredDetails({
                                    ...structuredDetails,
                                    dates: updatedDates,
                                  });
                                }}
                              />
                              <div style={{ borderBottom: "1px solid #ccc", width: "100%" }}></div>
                              <input
                                type="text"
                                placeholder="Type"
                                style={{
                                  width: "95%",
                                  backgroundColor: "transparent",
                                  border: "none",
                                  borderRadius: "0",
                                  padding: "10px",
                                  margin: "0",
                                }}
                                value={dateObj.dateType}
                                onChange={(e) => {
                                  const updatedDates = [...structuredDetails.dates];
                                  updatedDates[index].dateType = e.target.value;
                                  setStructuredDetails({
                                    ...structuredDetails,
                                    dates: updatedDates,
                                  });
                                }}
                              />
                            </div>
                            <button
                              style={{
                                position: "absolute",
                                top: "-10%",
                                right: "-2%",
                                borderRadius: "100px",
                                textAlign: "center",
                                backgroundColor: "red",
                                padding: "2px 3px",
                              }}
                              onClick={() => {
                                const updatedDates = structuredDetails.dates.filter(
                                  (_, i) => i !== index
                                );
                                setStructuredDetails({
                                  ...structuredDetails,
                                  dates: updatedDates,
                                });
                              }}
                            >
                              <IoMdClose size={16} />
                            </button>
                          </div>
                        ))}
                      <button
                        onClick={() =>
                          setStructuredDetails({
                            ...structuredDetails,
                            dates: [...(structuredDetails.dates || []), { date: "", type: "" }],
                          })
                        }
                      >
                        Add Date
                      </button>
                    </div>

                    <label>Address:</label>
                    <input
                      type="text"
                      value={structuredDetails.address || ""}
                      onChange={(e) =>
                        setStructuredDetails({
                          ...structuredDetails,
                          address: e.target.value,
                        })
                      }
                    />
                    <label>Cost:</label>
                    <input
                      type="text"
                      value={structuredDetails.paymentTerms || ""}
                      onChange={(e) =>
                        setStructuredDetails({
                          ...structuredDetails,
                          cost: e.target.value,
                        })
                      }
                    />
                    <label>Emails</label>
                    <div
                      style={{
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "20px",
                        borderLeft: "3px solid red",
                      }}
                    >
                      {structuredDetails.emailAddresses &&
                        structuredDetails.emailAddresses.map((emailObj, index) => (
                          <div
                            key={`email-${index}`}
                            style={{
                              display: "flex",
                              flexDirection: "row", // Change to column layout
                              marginBottom: "20px", // Optional for spacing between groups
                              position: "relative",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                            }}
                          >
                            <div style={{ width: "100%" }}>
                              <input
                                type="text"
                                placeholder="Name"
                                style={{
                                  width: "95%",
                                  backgroundColor: "transparent",
                                  border: "none",
                                  borderRadius: "0",
                                  padding: "10px",
                                  margin: "0",
                                }}
                                value={emailObj.entity}
                                onChange={(e) => {
                                  const updatedEmails = [...structuredDetails.emailAddresses];
                                  updatedEmails[index].entity = e.target.value;
                                  setStructuredDetails({
                                    ...structuredDetails,
                                    emailAddresses: updatedEmails,
                                  });
                                }}
                              />
                              <div style={{ borderBottom: "1px solid #ccc", width: "100%" }}></div>
                              <input
                                type="email"
                                placeholder="Email"
                                style={{
                                  width: "95%",
                                  backgroundColor: "transparent",
                                  border: "none",
                                  borderRadius: "0",
                                  padding: "10px",
                                  margin: "0",
                                }}
                                value={emailObj.email}
                                onChange={(e) => {
                                  const updatedEmails = [...structuredDetails.emailAddresses];
                                  updatedEmails[index].email = e.target.value;
                                  setStructuredDetails({
                                    ...structuredDetails,
                                    emailAddresses: updatedEmails,
                                  });
                                }}
                              />
                            </div>
                            <button
                              style={{
                                position: "absolute",
                                top: "-10%",
                                right: "-2%",
                                borderRadius: "100px",
                                textAlign: "center",
                                backgroundColor: "red",
                                padding: "2px 3px",
                              }}
                              onClick={() => {
                                const updatedEmails = structuredDetails.emailAddresses.filter(
                                  (_, i) => i !== index
                                );
                                setStructuredDetails({
                                  ...structuredDetails,
                                  emailAddresses: updatedEmails,
                                });
                              }}
                            >
                              <IoMdClose size={16} />
                            </button>
                          </div>
                        ))}
                      <button
                        onClick={() =>
                          setStructuredDetails({
                            ...structuredDetails,
                            emailAddresses: [
                              ...(structuredDetails.emailAddresses || []),
                              { name: "", email: "" },
                            ],
                          })
                        }
                      >
                        Add Email
                      </button>
                    </div>

                    <label>Phone Numbers</label>
                    <div
                      style={{
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "20px",
                        borderLeft: "3px solid red",
                      }}
                    >
                      {structuredDetails.phoneNumbers &&
                        structuredDetails.phoneNumbers.map((phoneObj, index) => (
                          <div
                            key={`phone-${index}`}
                            style={{
                              display: "flex",
                              flexDirection: "row", // Change to column layout
                              marginBottom: "20px", // Optional for spacing between groups
                              position: "relative",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                            }}
                          >
                            <div style={{ width: "100%" }}>
                              <input
                                type="text"
                                placeholder="Name"
                                style={{
                                  width: "95%",
                                  backgroundColor: "transparent",
                                  border: "none",
                                  borderRadius: "0",
                                  padding: "10px",
                                  margin: "0",
                                }}
                                value={phoneObj.entity}
                                onChange={(e) => {
                                  const updatedPhones = [...structuredDetails.phoneNumbers];
                                  updatedPhones[index].entity = e.target.value;
                                  setStructuredDetails({
                                    ...structuredDetails,
                                    phoneNumbers: updatedPhones,
                                  });
                                }}
                              />
                              <div style={{ borderBottom: "1px solid #ccc", width: "100%" }}></div>
                              <input
                                type="text"
                                placeholder="Phone"
                                style={{
                                  width: "95%",
                                  backgroundColor: "transparent",
                                  border: "none",
                                  borderRadius: "0",
                                  padding: "10px",
                                  margin: "0",
                                }}
                                value={phoneObj.phoneNumber}
                                onChange={(e) => {
                                  const updatedPhones = [...structuredDetails.phoneNumbers];
                                  updatedPhones[index].phoneNumber = e.target.value;
                                  setStructuredDetails({
                                    ...structuredDetails,
                                    phoneNumbers: updatedPhones,
                                  });
                                }}
                              />
                            </div>
                            <button
                              style={{
                                position: "absolute",
                                top: "-10%",
                                right: "-2%",
                                borderRadius: "100px",
                                textAlign: "center",
                                backgroundColor: "red",
                                padding: "2px 3px",
                              }}
                              onClick={() => {
                                const updatedPhones = structuredDetails.phoneNumbers.filter(
                                  (_, i) => i !== index
                                );
                                setStructuredDetails({
                                  ...structuredDetails,
                                  phoneNumbers: updatedPhones,
                                });
                              }}
                            >
                              <IoMdClose size={16} />
                            </button>
                          </div>
                        ))}
                      <button
                        onClick={() =>
                          setStructuredDetails({
                            ...structuredDetails,
                            phoneNumbers: [
                              ...(structuredDetails.phoneNumbers || []),
                              { name: "", phone: "" },
                            ],
                          })
                        }
                      >
                        Add Phone Number
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="email-column">
                <div style={{ display: "flex", gap: "10px" }}>
                  <div>
                    <label htmlFor="recipientEmail">Recipient Email:</label>
                    <input
                      type="email"
                      id="recipientEmail"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="Enter recipient email"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject">Subject:</label>
                    <input
                      type="text"
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Enter subject"
                    />
                  </div>
                </div>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadButton;
