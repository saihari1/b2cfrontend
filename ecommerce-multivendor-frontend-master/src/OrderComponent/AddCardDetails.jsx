import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import PaymentMode from "../PaymentComponent/PaymentMode";
import Upi from "../PaymentComponent/Upi";

const AddCardDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const priceToPay = location.state.priceToPay;
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const [selectedPayment, setSelectedPayment] = useState("");
  const [card, setCard] = useState({
    cardName: "",
    cardNumber: "",
    validThrough: "",
    cvv: "",
  });

  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handleCardInput = (e) => {
    const { name, value } = e.target;
    if (name === "cardName") {
      // Convert name on card to uppercase
      setCard({ ...card, [name]: value });
    } else if (name === "cardNumber") {
      // Remove non-digit characters and add spaces after every 4 digits
      const formattedValue = value.replace(/\D/g, "");
      setCard({ ...card, [name]: formattedValue });
    } else {
      setCard({ ...card, [name]: value });
    }
  };

  const validateCard = () => {
    const { cardName, cardNumber, validThrough, cvv } = card;

    if (!cardName.trim()) {
      toast.error("Name on card is required");
      return false;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      toast.error("Card number must be a 16-digit number");
      return false;
    }

    const validThroughPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!validThroughPattern.test(validThrough)) {
      toast.error("Valid through must be in the format MM/YY");
      return false;
    }

    const currentDate = new Date();
    const validThroughArray = validThrough.split("/");
    const validThroughMonth = parseInt(validThroughArray[0]);
    const validThroughYear = parseInt("20" + validThroughArray[1]);
    const validThroughDate = new Date(validThroughYear, validThroughMonth);

    if (validThroughDate <= currentDate) {
      toast.error("Your Card Validity expired");
      return false;
    }

    if (!/^\d{3}$/.test(cvv)) {
      toast.error("CVV must be a 3-digit number");
      return false;
    }

    return true;
  };

  const payForOrder = (e) => {
    e.preventDefault();

    if (!validateCard()) {
      return;
    }

    fetch("http://localhost:8080/api/order/add?userId=" + user.id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + customer_jwtToken,
      },
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              navigate("/home");
            }, 2000); // Redirect after 3 seconds
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 2000); // Redirect after 3 seconds
          } else {
            toast.error("It Seems Server is down!!!", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 2000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <PaymentMode onPaymentSelect={handlePaymentSelection} />
          </div>
        </div>
        <div className="col-md-8 mt-2 d-flex aligns-items-center justify-content-center">
          <div className="card form-card border-color" style={{ width: "25rem" }}>
            <div className="card-header bg-color custom-bg-text">
              <h5 className="card-title text-center">Payment Details</h5>
            </div>
            <div className="card-body text-color custom-bg">
              {selectedPayment === "cards" && (
                <div>
                  <h6>Card Payment</h6>
                  <form onSubmit={payForOrder}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        <b> Name on Card</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="cardName"
                        onChange={handleCardInput}
                        value={card.cardName}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="cardNumber" className="form-label">
                        <b> Card Number</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cardNumber"
                        name="cardNumber"
                        onChange={handleCardInput}
                        value={card.cardNumber}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="validThrough" className="form-label">
                        <b>Valid Through (MM/YY)</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="validThrough"
                        name="validThrough"
                        onChange={handleCardInput}
                        value={card.validThrough}
                        placeholder="MM/YY"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="cvv" className="form-label">
                        <b>CVV</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cvv"
                        name="cvv"
                        onChange={handleCardInput}
                        value={card.cvv}
                        required
                      />
                    </div>
                    <input
                      type="submit"
                      className="btn custom-bg-text bg-color"
                      value={"Pay Rs " + priceToPay}
                    />
                    <ToastContainer />
                  </form>
                </div>
              )}
              {selectedPayment === "upi" && (
                <div>
                  <h6>UPI Payment</h6>
                  <Upi />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCardDetails;
