import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

function RightPanel() {
  const [openedDropdown, setOpenedDropdown] = useState([false, false, false, false]);

  const toggleDropdown = (index) => {
    setOpenedDropdown((prev) => {
      let arr = [...prev];
      arr[index] = !arr[index];
      return arr;
    });
  };

  return (
    <div className="right-panel">
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ borderBottom: "1px solid #ccc" }}>
          <div
            style={{
              padding: "16px 10px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
            onClick={() => toggleDropdown(0)}
          >
            <span style={{ transform: "translateY(2px)" }}>
              {openedDropdown[0] ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </span>
            <span>Contracts</span>
          </div>
          {openedDropdown[0] && <div>contracts details</div>}
        </div>

        <div style={{ borderBottom: "1px solid #ccc" }}>
          <div
            style={{
              padding: "16px 10px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
            onClick={() => toggleDropdown(1)}
          >
            <span style={{ transform: "translateY(2px)" }}>
              {openedDropdown[1] ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </span>
            <span>Companies</span>
          </div>
          {openedDropdown[1] && <div>companies details</div>}
        </div>

        <div style={{ borderBottom: "1px solid #ccc" }}>
          <div
            style={{
              padding: "16px 10px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
            onClick={() => toggleDropdown(2)}
          >
            <span style={{ transform: "translateY(2px)" }}>
              {openedDropdown[2] ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </span>
            <span>Deals</span>
          </div>
          {openedDropdown[2] && <div>Deals details</div>}
        </div>
      </div>
    </div>
  );
}

export default RightPanel;
