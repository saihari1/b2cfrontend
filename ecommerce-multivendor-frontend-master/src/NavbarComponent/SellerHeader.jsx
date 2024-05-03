import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SellerHeader = () => {
  let navigate = useNavigate();

  // const user = JSON.parse(sessionStorage.getItem("active-seller"));


  const sellerLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-seller");
    sessionStorage.removeItem("seller-jwtToken");
    setTimeout(() => {
      navigate("/home");
      window.location.reload(true);
    }, 2000); // Redirect after 2 seconds
  };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li key="seller-order" className="nav-item">
        <Link
          to="/seller/order/all"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Seller Orders</b>
        </Link>
      </li>
      <li key="register-delivery" className="nav-item">
        <Link
          to="/seller/delivery/register"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Register Delivery</b>
        </Link>
      </li>
      <li key="view-delivery-persons" className="nav-item">
        <Link
          to="/seller/delivery-person/all"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">View Delivery Persons</b>
        </Link>
      </li>
      <li key="add-product" className="nav-item">
        <Link
          to="/product/add"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Add Product</b>
        </Link>
      </li>
      <li key="view-my-products" className="nav-item">
        <Link
          to="/seller/product/all"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">View My Products</b>
        </Link>
      </li>
      <li key="logout" className="nav-item">
        <Link
          to=""
          className="nav-link active"
          aria-current="page"
          onClick={sellerLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
      </li>
      <ToastContainer />
    </ul>
  );
};

export default SellerHeader;
