import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import Modal from "../global/Modal";
import NotFoundPage from "../../pages/NotFoundPage";
import HeygenVideoChatbot from "./HeygenVideoChatbot";

const FullPageChatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello, I am ArgreeD, your AI-based assistant. You can ask me anything about your provided document.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDataFetchingLoading, setIsDataFetchingLoading] = useState(false);
  const chatEndRef = useRef(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isVideoAssistantModalOpen, setIsVideoAssistantModalOpen] = useState(false);
  const [documentDetails, setDocumentDetails] = useState({});
  const [isError, setIsError] = useState(false);

  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);

  const openVideoAssistantModal = () => setIsVideoAssistantModalOpen(true);
  const closeVideoAssistantModal = () => setIsVideoAssistantModalOpen(false);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const fetchDocumentDetails = async () => {
      try {
        setIsDataFetchingLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/client/${window.location.pathname.split("/")[2]}`
        );
        const data = await response.json();
        console.log(data);
        setDocumentDetails(data);
        setIsDataFetchingLoading(false);
      } catch (error) {
        console.error("Error fetching client data:", error);
        setIsError(true);
        setIsDataFetchingLoading(false);
      }
    };

    fetchDocumentDetails();
  }, []);

  if (isError) {
    return <NotFoundPage />;
  }

  if (isDataFetchingLoading) {
    return <div>Loading...</div>;
  }

  const handleSendMessage = async () => {
    if (isLoading) {
      return;
    }

    if (input.trim() !== "") {
      setMessages((prev) => [...prev, { role: "user", text: input }]);
      setIsLoading(true);

      const response = await axios.post("http://localhost:3000/api/chatbot/ask", {
        pdfText: documentDetails.emailContent,
        question: input,
      });

      setMessages((prev) => [...prev, { role: "bot", text: response.data.answer }]);

      setInput("");
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#171717",
        color: "#ececec",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isVideoModalOpen && (
        <Modal isOpen={isVideoModalOpen} onClose={closeVideoModal} style={{ width: "1000px" }}>
          <h2
            style={{
              padding: "0 0 10px",
              margin: "0",
              textAlign: "center",
              borderBottom: "1px solid #333",
            }}
          >
            Document Explanation Video
          </h2>
          <video
            style={{ width: "100%", height: "auto" }}
            src={`https://resource2.heygen.ai/video/${documentDetails.heygenVideoId}/1280x720.mp4`}
            controls
          ></video>
        </Modal>
      )}

      {isVideoAssistantModalOpen && (
        <Modal
          isOpen={isVideoAssistantModalOpen}
          onClose={closeVideoAssistantModal}
          style={{ width: "500px" }}
        >
          <h2
            style={{
              padding: "0 0 10px",
              margin: "0",
              textAlign: "center",
              borderBottom: "1px solid #333",
            }}
          >
            Video Assistant
          </h2>
          <div>
            <HeygenVideoChatbot documentDetails={documentDetails} />
          </div>
        </Modal>
      )}

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          borderBottom: "1px solid #333",
        }}
      >
        <h3 style={{ margin: 0 }}>AgreeD</h3>
        <div>
          <button
            style={{
              backgroundColor: "transparent",
              color: "#ececec",
              border: "0",
              padding: "5px 10px",
              cursor: "pointer",
              outline: "none",
            }}
            onClick={openVideoAssistantModal}
          >
            Open Video Assistant
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              color: "#ececec",
              border: "0",
              padding: "5px 10px",
              cursor: "pointer",
              outline: "none",
            }}
            onClick={openVideoModal}
          >
            Open Ai Video
          </button>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          padding: "20px",
          gap: "20px",
        }}
      >
        <div style={{ flex: 1, backgroundColor: "#1e1e1e" }}>PDF Preview</div>

        {/* Main Chat Section */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Messages */}
          <div
            style={{
              height: "calc(100vh - 210px)",
              overflowY: "auto",
              padding: "20px",
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "5px",
                  display: "flex",
                  justifyContent: message.role === "user" ? "end" : "start",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 20px",
                    borderRadius: "25px",
                    backgroundColor: message.role === "user" ? "#444" : "#2E2E2E",
                    maxWidth: "70%",
                    textAlign: "left",
                  }}
                >
                  {message.text}
                </span>
              </div>
            ))}
            {isLoading && (
              <p style={{ padding: "0 18px", color: "orange", textAlign: "left" }}>
                AgreeD assistant is typing...
              </p>
            )}
            <div ref={chatEndRef}></div>
          </div>

          {/* Input Field */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "20px",
              paddingBottom: "0",
            }}
          >
            <div style={{ backgroundColor: "#444", borderRadius: "25px", width: "100%" }}>
              <div style={{ width: "100%", display: "flex" }}>
                <input
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "4px",
                    border: "0",
                    marginRight: "10px",
                    backgroundColor: "transparent",
                    outline: "none",
                    width: "100%",
                    color: "#ececec",
                  }}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Message AgreeD Assistant"
                />
                <div
                  onClick={handleSendMessage}
                  style={{
                    backgroundColor: "transparent",
                    color: "#666",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    padding: "0",
                    transform: "translate(-20px, 8px)",
                    offset: "none",
                    cursor: "pointer",
                  }}
                >
                  <FiSend size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPageChatbot;
