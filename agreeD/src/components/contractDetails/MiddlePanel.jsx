import React from "react";
import ActivitiesTab from "./ActivitiesTab";
import OverviewTab from "./OverviewTab";

const tabs = ["Overview", "Activities"];

function MiddlePanel({ contractDetails }) {
  const [activeTab, setActiveTab] = React.useState("Overview");

  return (
    <div className="middle-panel">
      <div style={{ padding: "0.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <input style={{ margin: 0 }} type="text" placeholder="Search" />
          <button style={{ marginTop: 0 }}>Collapse all</button>
        </div>
        <div style={{ display: "flex", borderBottom: "1px solid #ccc" }}>
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
