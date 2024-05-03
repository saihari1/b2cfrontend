import React from 'react';
 import '../App.css';
import upiLogo from "../images/upi-logo.png";
import { useLocation } from "react-router-dom";
const Upi = () => {
  const location = useLocation();
   const priceToPay = location.state.priceToPay;

  return (
    <div className="upi-box">
      <img
        src={upiLogo}
        alt="UPI Logo"
        width="70px"
        height="70px"
        className="upi-logo"
      />
      <input
        type="text"
        placeholder="  Enter Your UPI ID "
        className="upi-input"
      />
      <button className="upi-button">Pay {priceToPay}</button>
    </div>
  );
}

export default Upi;
