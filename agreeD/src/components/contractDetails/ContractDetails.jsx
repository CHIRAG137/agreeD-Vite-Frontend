import React, { useEffect, useState } from "react";
import "./ContractDetails.css";
import LeftPanel from "./LeftPanel";
import MiddlePanel from "./MiddlePanel";
import RightPanel from "./RightPanel";

const ContractDetails = ({ selectedPage, onPageChange }) => {
  const [contractId, setContractId] = useState();
  const [contractDetails, setContractDetails] = useState({});

  useEffect(() => {
    const id = selectedPage.split("/")[1].replace("#", "");
    setContractId(id);

    const fetchContractDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/client/${id}`);
        const data = await response.json();
        console.log(data);
        setContractDetails(data);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    fetchContractDetails();
  }, []);

  return (
    // <div style={{padding: "20px"}}>
    <div className="contract-details-container">
      <LeftPanel contractDetails={contractDetails} onPageChange={onPageChange} />
      <MiddlePanel contractDetails={contractDetails} />
      <RightPanel contractDetails={contractDetails} />
    </div>
    // </div>
  );
};

export default ContractDetails;
