import React from "react";
import ActivitiesTab from "./ActivitiesTab";
import OverviewTab from "./OverviewTab";

const tabs = ["Overview", "Activities"];

function MiddlePanel({ contractDetails }) {
  const [activeTab, setActiveTab] = React.useState("Overview");

  return (
    <div
      className="middle-panel"
      style={{
        borderLeft: "3px solid #313131",
        borderRight: "3px solid #313131",
        backgroundColor: "transparent",
      }}
    >
      <div style={{ padding: "0.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <input
            style={{
              margin: 0,
              backgroundColor: "transparent",
              border: "1px solid #313131",
              color: "#ececec",
            }}
            type="text"
            placeholder="Search"
          />
        </div>
        <div style={{ display: "flex", borderBottom: "1px solid #313131" }}>
          {tabs.map((tab) => (
            <div
              className={`${activeTab === tab ? "active-tab" : ""}`}
              style={{ cursor: "pointer", padding: "8px", fontWeight: "bold" }}
              onClick={() => {
                setActiveTab(tab);
              }}
            >
              {tab}
            </div>
          ))}
        </div>
        <div style={{ padding: "0 10px " }}>
          {activeTab === "Overview" && <OverviewTab contractDetails={contractDetails} />}
          {activeTab === "Activities" && <ActivitiesTab contractDetails={contractDetails} />}
        </div>
      </div>
    </div>
  );
}

export default MiddlePanel;
