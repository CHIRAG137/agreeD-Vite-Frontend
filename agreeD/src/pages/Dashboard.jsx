import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Tooltip from "../components/global/tooltip/Tooltip";
import { truncateWithDots } from "../utils/truncateWithDots";
import Loader from "../components/global/Loader";

const Dashboard = ({ handlePageChange }) => {
  const [clientData, setClientData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionType, setActionType] = useState("");

  const actionHandler = (type) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/client");
        const data = await response.json();
        setClientData(data);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      {isLoading && <Loader />}
      <h2>Client Details</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr style={{ position: "sticky", left: "0", top: "-2px", zIndex: 2 }}>
              <th style={{ position: "sticky", left: "-1px" }}>Client Name</th>
              <th>Contact Person</th>
              <th>Dates</th>
              <th>Address</th>
              <th>Cost</th>
              <th>Email Content</th>
              <th>Subject</th>
              <th>Recipient Email</th>
              <th>Heygen Video Link</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clientData.map((client, index) => (
              <tr key={client._id}>
                <td
                  style={{
                    position: "sticky",
                    left: "-1px",
                    zIndex: 1,
                  }}
                >
                  <a
                    href={`#contract-details/${client._id}`}
                    onClick={() => handlePageChange(`contract-details/${client._id}`)}
                  >
                    {client.clientName}
                  </a>
                </td>
                <td>{client.contactPerson}</td>
                <td>
                  <div style={{ cursor: "pointer" }}>
                    {client.dates.length > 0 ? (
                      <Tooltip
                        content={
                          <div>
                            {client.dates.map((date, index) => (
                              <div key={index} style={{ display: "flex", gap: "10px" }}>
                                <div style={{ fontWeight: "bold" }}>{date.dateType}:</div>
                                <div>{date.dateFormat}</div>
                              </div>
                            ))}
                          </div>
                        }
                        direction="right"
                      >
                        <span style={{ marginRight: "3px" }}>[{client.dates.length}]</span>
                        <span>{client.dates.length > 1 ? "Dates" : "Date"}</span>
                      </Tooltip>
                    ) : (
                      "No Dates"
                    )}
                  </div>
                </td>
                <td>
                  <Tooltip content={client.address} direction="bottom">
                    <span>{truncateWithDots(client.address, 25)}</span>
                  </Tooltip>
                </td>
                <td>{client.cost}</td>
                {/* <td>{client.emailContent}</td> */}
                <td>
                  <Tooltip
                    content={truncateWithDots(client.emailContent.slice(70), 100)}
                    direction="bottom"
                  >
                    <span>{truncateWithDots(client.emailContent, 20)}</span>
                  </Tooltip>
                </td>
                <td>
                  <Tooltip content={client.subject} direction="bottom">
                    <span>{truncateWithDots(client.subject, 35)}</span>
                  </Tooltip>
                </td>
                <td>{client.recipientEmail}</td>
                <td>
                  <a
                    href={`https://resource2.heygen.ai/video/${
                      client.heygenVideoId || "92f93fc53304401cad3f8426633d8cb2"
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Video
                  </a>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <button
                      style={{
                        color: "#000",
                        fontSize: "10px",
                        padding: "3px",
                        backgroundColor: "orange",
                      }}
                      onClick={() => {
                        actionHandler("email");
                      }}
                    >
                      Send Remainder Email
                    </button>
                    <button
                      style={{
                        color: "#000",
                        fontSize: "10px",
                        padding: "3px",
                        backgroundColor: "orange",
                      }}
                      onClick={() => {
                        actionHandler("call");
                      }}
                    >
                      Remainder Call
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
