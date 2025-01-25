import React, { useEffect, useState } from "react";
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  TaskType,
} from "@heygen/streaming-avatar";
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";

function HeygenVideoChatbot({ documentDetails }) {
  const videoRef = React.useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isStartupCompleted, setIsStartupCompleted] = useState(false);
  const [silenceTimeout, setSilenceTimeout] = useState(null);
  const [status, setStatus] = useState("");

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const fetchAccessToken = async () => {
    try {
      const apiKey = import.meta.env.VITE_HEYGEN_API_KEY;
      const response = await fetch("https://api.heygen.com/v1/streaming.create_token", {
        method: "POST",
        headers: { "x-api-key": apiKey },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch access token: ${response.statusText}`);
      }

      const { data } = await response.json();
      return data.token;
    } catch (error) {
      console.error("Error fetching access token:", error.message);
      throw error;
    }
  };

  const initializeAvatarSession = async () => {
    try {
      setStatus("Initializing avatar session...");
      const token = await fetchAccessToken();
      const newAvatar = new StreamingAvatar({ token });
      setAvatar(newAvatar);

      const data = await newAvatar.createStartAvatar({
        quality: AvatarQuality.High,
        avatarName: "default",
      });

      setSessionData(data);
      setIsSessionActive(true);

      newAvatar.on(StreamingEvents.STREAM_READY, handleStreamReady);
      newAvatar.on(StreamingEvents.STREAM_DISCONNECTED, handleStreamDisconnected);
      setIsStartupCompleted(true);

      setIsStartupCompleted(true);
      setStatus("Avatar session initialized.");
    } catch (error) {
      setStatus("Failed to initialize avatar session.");
      console.error("Error initializing avatar session:", error.message);
    }
  };

  useEffect(() => {
    const initializeSession = async () => {
      await initializeAvatarSession();
    };
    initializeSession();
  }, []);

  useEffect(async () => {
    const greetingSpeech = async () => {
      if (isStartupCompleted && avatar && sessionData) {
        await avatar.speak({
          sessionId: sessionData.session_id,
          text: "Hello, I am AgreeD Ai assistant!",
          task_type: TaskType.REPEAT,
        });
      }
    };
    greetingSpeech();
    startListening();
  }, [isStartupCompleted, avatar, sessionData]);

  // Start SpeechRecognition
  const startListening = () => {
    resetTranscript(); // Clear transcript for a fresh session
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    console.log("Listening...");
    setStatus("Listening...");
  };

  // Detect silence and stop SpeechRecognition after 10 second
  const handleSilenceTimeout = async () => {
    console.log("Silence detected, stopping recognition...");
    setStatus("Silence detected, stopping recognition... and your query is processing");
    SpeechRecognition.stopListening();
    if (transcript.trim()) {
      console.log("Sending transcript to Gemini:", transcript);

      const response = await axios.post("http://localhost:3000/api/chatbot/ask", {
        pdfText: documentDetails.emailContent,
        question: transcript, // Changed from `input` to `transcript`
      });

      handleSpeak(response.data.answer);
    }
    resetTranscript(); // Clear the transcript for the next input
  };

  useEffect(() => {
    if (listening) {
      // Clear previous timeout whenever transcript changes (user is speaking)
      if (silenceTimeout) {
        clearTimeout(silenceTimeout);
      }

      // Set new timeout to stop listening after 10 second of silence
      const timeout = setTimeout(handleSilenceTimeout, 10000);

      setSilenceTimeout(timeout);
    }

    // return () => {
    //   if (silenceTimeout) clearTimeout(silenceTimeout);
    // };
  }, [transcript, listening]);

  const handleStreamReady = (event) => {
    if (event.detail && videoRef.current) {
      videoRef.current.srcObject = event.detail;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play().catch(console.error);
      };
    } else {
      console.error("Stream is not available");
    }
  };

  const handleStreamDisconnected = () => {
    console.log("Stream disconnected");
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsSessionActive(false);
    setAvatar(null);
  };

  const terminateAvatarSession = async () => {
    if (!avatar || !sessionData) return;

    await avatar.stopAvatar();
    videoRef.current.srcObject = null;
    setAvatar(null);
    setSessionData(null);
    setIsSessionActive(false);
  };

  const handleSpeak = async (text) => {
    if (!avatar || !text) return;
    try {
      setStatus("ArgreeD assistant is speaking");
      await avatar.speak({ text });
      startListening();
    } catch (error) {
      console.error("Error during speaking:", error.message);
    }
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Your browser doesn't support speech recognition.</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Video Section */}
        <div
          style={{
            width: "320px",
            height: "240px",
            backgroundColor: "#000",
            marginBottom: "20px",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: "100%", height: "100%" }}
          ></video>
        </div>

        {status && (
          <p style={{ padding: "0 18px", color: "orange", textAlign: "left" }}>{status}</p>
        )}

        {/* Controls Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
            <button
              onClick={terminateAvatarSession}
              disabled={!isSessionActive}
              style={{ flex: 1, padding: "10px", borderRadius: "4px" }}
            >
              End Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeygenVideoChatbot;
