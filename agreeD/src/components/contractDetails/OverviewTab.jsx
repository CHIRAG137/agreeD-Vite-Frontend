import React from "react";

const OverviewTab = ({ contractDetails }) => {
  return (
    <div>
      <video
        style={{ width: "100%", height: "auto" }}
        src={`https://resource2.heygen.ai/video/${
          contractDetails.heygenVideoId || "92f93fc53304401cad3f8426633d8cb2"
        }/1280x720.mp4`}
        controls
      ></video>
    </div>
  );
};

export default OverviewTab;
