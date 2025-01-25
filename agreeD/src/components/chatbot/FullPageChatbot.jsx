import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";

const ChatUI = () => {
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

  const handleSendMessage = async () => {
    if (isLoading) {
      return;
    }

    if (input.trim() !== "") {
      setMessages((prev) => [...prev, { role: "user", text: input }]);
      setIsLoading(true);

      // const response = await axios.post("http://localhost:3000/api/chatbot/ask", {
      //   pdfText,
      //   question: input,
      // });

      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "bot", text: "bot response" }]);
      }, 1000);

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

export default ChatUI;
