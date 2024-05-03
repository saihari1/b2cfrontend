import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ViewSellerDeliveryPerson = () => {
  const [allDelivery, setAllDelivery] = useState([]);
  const seller = JSON.parse(sessionStorage.getItem("active-seller"));
  const seller_jwtToken = sessionStorage.getItem("seller-jwtToken");

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/fetch/seller/delivery-person?sellerId=" +
            seller.id,
          {
            headers: {
              Authorization: "Bearer " + seller_jwtToken,
            },
          }
        );
        setAllDelivery(response.data.users);
      } catch (error) {
        console.error("Error fetching delivery persons:", error);
        toast.error("Error fetching delivery persons", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    getAllUsers();
  }, [seller.id, seller_jwtToken]);

  const deleteDelivery = (userId, e) => {
    fetch(
      "http://localhost:8080/api/user/delete/seller/delivery-person?deliveryId=" +
        userId,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + seller_jwtToken,
        },
      }
    )
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
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
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
            }, 1000); // Redirect after 3 seconds
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
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h2>All Delivery Persons</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          {allDelivery.length === 0 ? (
            <p className="text-center">No records found</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover text-color text-center">
                <thead className="table-bordered border-color bg-color custom-bg-text">
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email Id</th>
                    <th scope="col">Phone No</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allDelivery.map((delivery) => (
                    <tr key={delivery.id}>
                      <td>{delivery.firstName}</td>
                      <td>{delivery.lastName}</td>
                      <td>{delivery.emailId}</td>
                      <td>{delivery.phoneNo}</td>
                      <td>
                        {delivery.address.street}, {delivery.address.city},{" "}
                        {delivery.address.pincode}
                      </td>
                      <td>
                        <button
                          onClick={() => deleteDelivery(delivery.id)}
                          className="btn btn-sm bg-color custom-bg-text ms-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewSellerDeliveryPerson; 