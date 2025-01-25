import React, { useRef, useState, useEffect } from "react";
import { MdMicNone } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import axios from "axios";

const Chatbot = ({ style, pdfText }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello, I am ArgreeD, your AI-based assistant. You can ask me anything about your provided document.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      setMessages((prev) => [...prev, { role: "user", text: input }]);
      setIsLoading(true);

      const response = await axios.post("http://localhost:3000/api/chatbot/ask", {
        pdfText,
        question: input,
      });

      setMessages((prev) => [...prev, { role: "bot", text: response.data.answer }]);
      setInput("");
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Button to open chatbot */}
      <button
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#1A73E8",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          cursor: "pointer",
          fontSize: "24px",
          ...style,
        }}
        onClick={toggleChatbot}
      >
        💬
      </button>

      {/* Chatbot UI */}
      {isChatbotOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            width: "325px",
            height: "400px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            ...style,
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              backgroundColor: "#1A73E8",
              color: "#fff",
              padding: "10px",
              textAlign: "center",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            Chatbot
          </div>

          {/* Messages Section */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              fontSize: "12px",
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  margin: "5px 0",
                  display: "flex",
                  justifyContent: message.role === "user" ? "end" : "start",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px",
                    borderRadius: "10px",
                    backgroundColor: message.role === "user" ? "#DCF8C6" : "#F1F1F1",
                    maxWidth: "70%",
                    color: "black",
                    textAlign: "left",
                  }}
                >
                  {message.text}
                </span>
              </div>
            ))}
            {isLoading && <p style={{ color: "black", textAlign: "left" }}>Bot is typing...</p>}
            <div ref={chatEndRef} />
          </div>

          {/* Input Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              padding: "10px",
              borderTop: "1px solid #ccc",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ccc",
                borderRadius: "25px",
                padding: "2px 12px",
                width: "90%",
                backgroundColor: "#f4f4f4",
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: "0",
                  outline: "none",
                  marginRight: "0",
                  marginBottom: "0",
                  offset: "none",
                  border: "none",
                  backgroundColor: "#f4f4f4",
                  fontSize: "14px",
                }}
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
                  transform: "translateY(3px)",
                  offset: "none",
                  cursor: "pointer",
                }}
              >
                <FiSend size={20} />
              </div>
            </div>
            {/* <div style={{ display: "flex", gap: "5px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "black",
                }}
              >
                <MdMicNone size={25} />
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
