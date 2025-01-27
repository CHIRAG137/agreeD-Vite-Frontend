import React from "react";
import { truncateWithDots } from "../../utils/truncateWithDots";
import { callContent, remainderEmails } from "../data";

const ActivitiesTab = ({ contractDetails }) => {
  return (
    <div>
      {/* <div style={{ textAlign: "start", margin: "10px 0 16px 0", fontSize: "16px" }}>filters</div> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          height: "480px",
          overflowY: "auto",
        }}
      >
        {(contractDetails.remainderEmails?.length > 0 || remainderEmails.slice(0, 1)).map(
          (email) => (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <div style={{ textAlign: "start", fontSize: "18px" }}>Email:</div>
                <div
                  style={{
                    textAlign: "start",
                    boxShadow: "0 0 4px 0px rgba(50, 50, 50, 0.32)",
                    border: "1px solid #313131",
                    borderRadius: "4px",
                    padding: "10px",
                  }}
                >
                  <div>
                    Date and Time: <span>{email.createdAt || "25 January 2025"}</span>
                  </div>
                  <div>
                    Subject: <span>{email.subject || ""}</span>
                  </div>
                  <div>
                    <span>
                      Event Date: <span>{email.date || ""}</span>
                    </span>
                    <span>
                      Mail type: <span>{email.dateType || ""}</span>
                    </span>
                  </div>
                  <div>
                    Content: <span>{truncateWithDots(email.emailContent, 50) || ""}</span>
                  </div>
                </div>
              </div>
            </>
          )
        )}
        {callContent.slice(0, 2).map((callInfo) => (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <div style={{ textAlign: "start", fontSize: "18px" }}>Call:</div>
              <div
                style={{
                  textAlign: "start",
                  boxShadow: "0 0 4px 0px rgba(50, 50, 50, 0.32)",
                  border: "1px solid #313131",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              >
                <div>
                  Date and Time: <span>{callInfo.createdAt || "25 January 2025"}</span>
                </div>
                <div>
                  <span>
                    Event Date: <span>{callInfo.date || ""}</span>
                  </span>
                  <span>
                    Mail type: <span>{callInfo.dateType || ""}</span>
                  </span>
                </div>
                <div>
                  Transcript: <span>{truncateWithDots(callInfo.content, 50) || ""}</span>
                </div>
              </div>
            </div>
          </>
        ))}
        {(contractDetails.remainderEmails?.length > 0 || remainderEmails.slice(1, 3)).map(
          (email) => (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <div style={{ textAlign: "start", fontSize: "18px" }}>Email:</div>
                <div
                  style={{
                    textAlign: "start",
                    boxShadow: "0 0 4px 0px rgba(50, 50, 50, 0.32)",
                    border: "1px solid #313131",
                    borderRadius: "4px",
                    padding: "10px",
                  }}
                >
                  <div>
                    Date and Time: <span>{email.createdAt || "25 January 2025"}</span>
                  </div>
                  <div>
                    Subject: <span>{email.subject || ""}</span>
                  </div>
                  <div>
                    <span>
                      Event Date: <span>{email.date || ""}</span>
                    </span>
                    <span>
                      Mail type: <span>{email.dateType || ""}</span>
                    </span>
                  </div>
                  <div>
                    Content: <span>{truncateWithDots(email.emailContent, 50) || ""}</span>
                  </div>
                </div>
              </div>
            </>
          )
        )}
        {(contractDetails?.callContent?.length > 0 || callContent.slice(3)).map((callInfo) => (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <div style={{ textAlign: "start", fontSize: "18px" }}>Call:</div>
              <div
                style={{
                  textAlign: "start",
                  boxShadow: "0 0 4px 0px rgba(50, 50, 50, 0.32)",
                  border: "1px solid #313131",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              >
                <div>
                  Date and Time: <span>{callInfo.createdAt || "25 January 2025"}</span>
                </div>
                <div>
                  <span>
                    Event Date: <span>{callInfo.date || ""}</span>
                  </span>
                  <span>
                    Mail type: <span>{callInfo.dateType || ""}</span>
                  </span>
                </div>
                <div>
                  Transcript: <span>{truncateWithDots(callInfo.content, 50) || ""}</span>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesTab;
