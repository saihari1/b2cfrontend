import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const api_Url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const seller = JSON.parse(sessionStorage.getItem("active-seller"));

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phoneNo: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
  });

  useEffect(() => {
    const url = document.URL;
    if (url.indexOf('customer') !== -1) {
      setUser((prevUser) => ({ ...prevUser, role: 'Customer' }));
    } else if (url.indexOf('delivery') !== -1) {
      setUser((prevUser) => ({ ...prevUser, role: 'Delivery' }));
    } else if (url.indexOf('seller') !== -1) {
      setUser((prevUser) => ({ ...prevUser, role: 'Seller' }));
    }
  }, []);

  const handleUserInput = (e) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  };

  const saveUser = (e) => {
    e.preventDefault();

    if (user.role === "Delivery") {
      user.sellerId = seller.id;
    }

    fetch(`${api_Url}/api/user/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate("/user/login");
          }, 1000);
        } else {
          toast.error(data.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error registering user", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div>
      <div className="mt-2 d-flex align-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          className="form-card border-color text-color custom-bg"
          style={{ width: "50rem" }}
        >
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "45px",
              }}
            >
              <h5 className="card-title">Register Here!!! {user.role}</h5>
            </div>
            <div className="card-body mt-3">
              <form className="row g-3" onSubmit={saveUser}>
                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="firstName" className="form-label">
                    <b>First Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    onChange={handleUserInput}
                    value={user.firstName}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="lastName" className="form-label">
                    <b>Last Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    onChange={handleUserInput}
                    value={user.lastName}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="emailId" className="form-label">
                    <b>Email Id</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    onChange={handleUserInput}
                    value={user.emailId}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="password" className="form-label">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={handleUserInput}
                    value={user.password}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="phoneNo" className="form-label">
                    <b>Contact No</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNo"
                    name="phoneNo"
                    onChange={handleUserInput}
                    value={user.phoneNo}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="street" className="form-label">
                    <b>Street</b>
                  </label>
                  <textarea
                    className="form-control"
                    id="street"
                    name="street"
                    rows="3"
                    onChange={handleUserInput}
                    value={user.street}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="city" className="form-label">
                    <b>City</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    onChange={handleUserInput}
                    value={user.city}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="pincode" className="form-label">
                    <b>Pincode</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pincode"
                    name="pincode"
                    onChange={handleUserInput}
                    value={user.pincode}
                    required
                  />
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <button type="submit" className="btn bg-color custom-bg-text">
                    Register User
                  </button>
                </div>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
