import React, { useState } from "react";
import { MdMicNone } from "react-icons/md";

const Chatbot = ({ style }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      setMessages((prev) => [...prev, { role: "user", text: input }]);
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "bot", text: "Bot Response" }]);
      }, 1000);
      setInput("");
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
            width: "300px",
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
                  }}
                >
                  {message.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input Section */}
          <div
            style={{
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #ccc",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                outline: "none",
                marginRight: "5px",
                marginBottom: "0",
              }}
            />
            <div style={{ display: "flex", gap: "5px" }}>
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
              <button
                onClick={handleSendMessage}
                style={{
                  backgroundColor: "#2ECC71",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
