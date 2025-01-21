import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [clientData, setClientData] = useState([]);

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
      <h2>Client Details</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Contact Person</th>
              <th>Dates</th>
              <th>Address</th>
              <th>Cost</th>
              {/* <th>Email Content</th> */}
              <th>Subject</th>
              <th>Recipient Email</th>
              <th>Heygen Video Link</th>
            </tr>
          </thead>
          <tbody>
            {clientData.map((client) => (
              <tr key={client._id}>
                <td>{client.clientName}</td>
                <td>{client.contactPerson}</td>
                <td>{client.dates}</td>
                <td>{client.address}</td>
                <td>{client.cost}</td>
                {/* <td>{client.emailContent}</td> */}
                <td>{client.subject}</td>
                <td>{client.recipientEmail}</td>
                <td><a href={client.heygenVideoLink} target="_blank" rel="noopener noreferrer">Video</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
