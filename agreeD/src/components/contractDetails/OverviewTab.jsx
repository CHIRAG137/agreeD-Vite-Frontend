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
        <span>
          {truncateWithDots(
            `https://resource2.heygen.ai/video/${
              contractDetails.heygenVideoId || "92f93fc53304401cad3f8426633d8cb2"
            }/1280x720.mp4`,
            50
          )}
        </span>
      </div>
      <div>
        <span style={{ color: "orange" }}>AgreeD Chatbot Link:</span>{" "}
        <span>
          {truncateWithDots(
            `https://resource2.heygen.ai/video/${
              contractDetails.heygenVideoId || "92f93fc53304401cad3f8426633d8cb2"
            }/1280x720.mp4`,
            50
          )}
        </span>
      </div>
    </div>
  );
};

export default OverviewTab;
