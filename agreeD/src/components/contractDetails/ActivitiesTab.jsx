import React from "react";

const ActivitiesTab = () => {
  return (
    <div>
      <div style={{ textAlign: "start", margin: "10px 0 16px 0", fontSize: "16px" }}>filters</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <div style={{ textAlign: "start", fontSize: "18px" }}>January 2025</div>
          <div
            style={{
              textAlign: "start",
              backgroundColor: "#fff",
              boxShadow: "0 0 4px 0px rgba(0,0,0,0.32)",
              borderRadius: "4px",
              padding: "10px",
            }}
          >
            <div>content</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesTab;
