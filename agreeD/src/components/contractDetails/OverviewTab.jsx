import React from "react";

const OverviewTab = ({ contractDetails }) => {
  return (
    <div>
      <video
        style={{ width: "100%", height: "auto" }}
        src={`https://resource2.heygen.ai/video/${contractDetails.heygenVideoId}/1280x720.mp4`}
        controls
      ></video>
    </div>
  );
};

export default OverviewTab;
