import React from "react";
import { truncateWithDots } from "../../utils/truncateWithDots";

const OverviewTab = ({ contractDetails }) => {
  return (
    <div style={{ paddingTop: "10px" }}>
      <video
        style={{ width: "100%", height: "auto" }}
        src={`https://resource2.heygen.ai/video/${
          contractDetails.heygenVideoId || "92f93fc53304401cad3f8426633d8cb2"
        }/1280x720.mp4`}
        controls
      ></video>
      <div>
        <span style={{ color: "orange" }}>Heygen Video Link:</span>{" "}
        <a
          href={`https://resource2.heygen.ai/video/${
            contractDetails.heygenVideoId || "92f93fc53304401cad3f8426633d8cb2"
          }/1280x720.mp4`}
          target="_blank"
        >
          {truncateWithDots(
            `https://resource2.heygen.ai/video/${
              contractDetails.heygenVideoId || "92f93fc53304401cad3f8426633d8cb2"
            }/1280x720.mp4`,
            50
          )}
        </a>
      </div>
      <div>
        <span style={{ color: "orange" }}>AgreeD Chatbot Link:</span>{" "}
        <a
          href={`http://localhost:5173/chatbot/${
            contractDetails.randomString || "372v6u5w1e4ju5t6i2m475u4i3g2i5r3"
          }`}
          target="_blank"
        >
          {truncateWithDots(
            `http://localhost:5173/chatbot/${
              contractDetails.randomString || "372v6u5w1e4ju5t6i2m475u4i3g2i5r3"
            }`,
            50
          )}
        </a>
      </div>
    </div>
  );
};

export default OverviewTab;
