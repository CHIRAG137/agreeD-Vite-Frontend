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
            </span>
            Back
          </div>
        </div>
        {/* <div style={{ fontSize: "20px", textAlign: "left" }}>{contractDetails.clientName}</div> */}
        <div
          style={{
            fontSize: "20px",
            textAlign: "left",
            overflowY: "auto",
            height: "520px",
            paddingRight: "5px",
          }}
        >
          <div className="row" style={{ flexDirection: "column" }}>
            <div className="details-column" style={{ padding: 0, maxWidth: "100%", border: 0 }}>
              {contractDetails && (
                <>
                  <label>Client Name:</label>
                  <input
                    disabled
                    style={{
                      backgroundColor: "transparent",
                      color: "#ececec",
                      border: "1px solid #313131",
                    }}
                    type="text"
                    value={contractDetails.clientName || ""}
                  />
                  <label>Contact Person:</label>
                  <input
                    disabled
                    style={{
                      backgroundColor: "transparent",
                      color: "#ececec",
                      border: "1px solid #313131",
                    }}
                    type="text"
                    value={contractDetails.contactPerson || ""}
                  />
                  <label>Dates</label>
                  <div
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #313131",
                      padding: "10px",
                      marginBottom: "20px",
                      borderLeft: "3px solid red",
                      borderLeft: "3px solid orange",
                    }}
                  >
                    {contractDetails.dates &&
                      contractDetails.dates.map((dateObj, index) => (
                        <div
                          key={`date-${index}`}
                          style={{
                            display: "flex",
                            flexDirection: "row", // Change to column layout
                            marginBottom: "20px", // Optional for spacing between groups
                            position: "relative",
                            border: "1px solid #313131",
                            borderRadius: "5px",
                          }}
                        >
                          <div style={{ width: "100%" }}>
                            <input
                              disabled
                              // style={{
                              //   backgroundColor: "transparent",
                              //   color: "#ececec",
                              //   border: "1px solid #313131",
                              // }}
                              type="text"
                              placeholder="Date"
                              style={{
                                width: "95%",
                                color: "#ececec",
                                backgroundColor: "transparent",
                                border: "none",
                                borderRadius: "0",
                                padding: "10px",
                                margin: "0",
                              }}
                              value={dateObj.dateFormat}
                            />
                            <div style={{ borderBottom: "1px solid #313131", width: "100%" }}></div>
                            <input
                              disabled
                              type="text"
                              placeholder="Type"
                              style={{
                                width: "95%",
                                color: "#ececec",
                                backgroundColor: "transparent",
                                border: "none",
                                borderRadius: "0",
                                padding: "10px",
                                margin: "0",
                              }}
                              value={dateObj.dateType}
                            />
                          </div>
                        </div>
                      ))}
                  </div>

                  <label>Address:</label>
                  <input
                    disabled
                    style={{
                      backgroundColor: "transparent",
                      color: "#ececec",
                      border: "1px solid #313131",
                    }}
                    type="text"
                    value={contractDetails.address || ""}
                  />
                  <label>Cost:</label>
                  <input
                    disabled
                    style={{
                      backgroundColor: "transparent",
                      color: "#ececec",
                      border: "1px solid #313131",
                    }}
                    type="text"
                    value={contractDetails.cost || ""}
                  />
                  <label>Emails</label>
                  <div
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #313131",
                      padding: "10px",
                      marginBottom: "20px",
                      borderLeft: "3px solid red",
                      borderLeft: "3px solid orange",
                    }}
                  >
                    {contractDetails.emailAddresses &&
                      contractDetails.emailAddresses.map((emailObj, index) => (
                        <div
                          key={`email-${index}`}
                          style={{
                            display: "flex",
                            flexDirection: "row", // Change to column layout
                            marginBottom: "20px", // Optional for spacing between groups
                            position: "relative",
                            border: "1px solid #313131",
                            borderRadius: "5px",
                          }}
                        >
                          <div style={{ width: "100%" }}>
                            <input
                              disabled
                              type="text"
                              placeholder="Name"
                              style={{
                                width: "95%",
                                color: "#ececec",
                                backgroundColor: "transparent",
                                border: "none",
                                borderRadius: "0",
                                padding: "10px",
                                margin: "0",
                              }}
                              value={emailObj.entity}
                            />
                            <div style={{ borderBottom: "1px solid #313131", width: "100%" }}></div>
                            <input
                              disabled
                              type="email"
                              placeholder="Email"
                              style={{
                                width: "95%",
                                color: "#ececec",
                                backgroundColor: "transparent",
                                border: "none",
                                borderRadius: "0",
                                padding: "10px",
                                margin: "0",
                              }}
                              value={emailObj.email}
                            />
                          </div>
                        </div>
                      ))}
                  </div>

                  <label>Phone Numbers</label>
                  <div
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #313131",
                      padding: "10px",
                      marginBottom: "20px",
                      borderLeft: "3px solid red",
                      borderLeft: "3px solid orange",
                    }}
                  >
                    {contractDetails.phoneNumbers &&
                      contractDetails.phoneNumbers.map((phoneObj, index) => (
                        <div
                          key={`phone-${index}`}
                          style={{
                            display: "flex",
                            flexDirection: "row", // Change to column layout
                            marginBottom: "20px", // Optional for spacing between groups
                            position: "relative",
                            border: "1px solid #313131",
                            borderRadius: "5px",
                          }}
                        >
                          <div style={{ width: "100%" }}>
                            <input
                              disabled
                              type="text"
                              placeholder="Name"
                              style={{
                                width: "95%",
                                color: "#ececec",
                                backgroundColor: "transparent",
                                border: "none",
                                borderRadius: "0",
                                padding: "10px",
                                margin: "0",
                              }}
                              value={phoneObj.entity}
                            />
                            <div style={{ borderBottom: "1px solid #313131", width: "100%" }}></div>
                            <input
                              disabled
                              type="text"
                              placeholder="Phone"
                              style={{
                                width: "95%",
                                color: "#ececec",
                                backgroundColor: "transparent",
                                border: "none",
                                borderRadius: "0",
                                padding: "10px",
                                margin: "0",
                              }}
                              value={phoneObj.phoneNumber}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
            <div className="email-column" style={{ padding: "0" }}>
              <div style={{ display: "flex", gap: "10px" }}>
                <div>
                  <label htmlFor="recipientEmail">Recipient Email:</label>
                  <input
                    disabled
                    style={{
                      backgroundColor: "transparent",
                      color: "#ececec",
                      border: "1px solid #313131",
                    }}
                    type="email"
                    id="recipientEmail"
                    value={contractDetails.recipientEmail}
                  />
                </div>
                <div>
                  <label htmlFor="subject">Subject:</label>
                  <input
                    disabled
                    style={{
                      backgroundColor: "transparent",
                      color: "#ececec",
                      border: "1px solid #313131",
                    }}
                    type="text"
                    id="subject"
                    placeholder="Enter subject"
                  />
                </div>
              </div>
              <textarea
                style={{
                  backgroundColor: "transparent",
                  color: "#ececec",
                  border: "1px solid #313131",
                }}
                value={contractDetails.emailContent}
                rows="10"
                cols="50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftPanel;
