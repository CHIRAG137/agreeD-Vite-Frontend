import React from "react";
import { IoIosArrowBack } from "react-icons/io";

function LeftPanel({ contractDetails, onPageChange }) {
  return (
    <div className="left-panel">
      <div style={{ padding: "12px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
          <div onClick={() => onPageChange("dashboard")} style={{ cursor: "pointer" }}>
            <span style={{ fontSize: "12px" }}>
              <IoIosArrowBack />
            </span>{" "}
            Back
          </div>
          <div>Actions</div>
        </div>
        <div style={{ fontSize: "20px", textAlign: "left" }}>{contractDetails.clientName}</div>
      </div>
    </div>
  );
}

export default LeftPanel;
