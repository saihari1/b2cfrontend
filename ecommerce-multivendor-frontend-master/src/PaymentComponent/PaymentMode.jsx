
import React from "react";

const PaymentMode = ({ onPaymentSelect }) => {
    // Modified Code for upi and cod
    
    const [state, setState] = React.useState({
        cards: false,
        upi: false,
        cod: false,
    });
    const handleChange = (event) => {
        setState({
            cards: event.target.name === "cards" ? event.target.checked : false,
            upi: event.target.name === "upi" ? event.target.checked : false,
            cod: event.target.name === "cod" ? event.target.checked : false,
         
        });
        onPaymentSelect(event.target.name);
    };
    const { cards, upi, cod } = state;
    // const error = [cards, upi, cod].filter((v) => v).length !== 2;

    return (
        <div className="card-body">
            <h5 className="card-title">Payment Mode</h5>
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="cards"
                    name="cards"
                    checked={cards}
                    onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="card">
                    Credit / Debit Card
                </label>
            </div>

            {/* for Upi payment */}
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="upi"
                    name="upi"
                    checked={upi}
                    onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="card">
                    UPI
                </label>
            </div>
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="cod"
                    name="cod"
                    checked={cod}
                    onChange={handleChange}
                    disabled

                />
                <label className="form-check-label" htmlFor="cod">
                    COD(Cash On Delivery) *
                </label>
            </div>
            <small>* Not Available</small>
        </div>
    )
}

export default PaymentMode;