import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const [categories, setCategories] = useState([]);

  const seller = JSON.parse(sessionStorage.getItem("active-seller"));
  const seller_jwtToken = sessionStorage.getItem("seller-jwtToken");

  let navigate = useNavigate();

  const retrieveAllCategories = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/category/fetch/all"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const resCategory = await retrieveAllCategories();
      if (resCategory) {
        setCategories(resCategory.categories);
      }
    };

    getAllCategories();
  }, []);

  const [selectedImage1, setSelectImage1] = useState(null);
  const [selectedImage2, setSelectImage2] = useState(null);
  const [selectedImage3, setSelectImage3] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    sellerId: "",
  });

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const saveProduct = (e) => {
    e.preventDefault();
    if (seller === null) {
      toast.error("Seller Id is missing!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    const formData = new FormData();
    formData.append("image1", selectedImage1);
    formData.append("image2", selectedImage2);
    formData.append("image3", selectedImage3);
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("categoryId", product.categoryId);
    formData.append("sellerId", seller.id);

    axios
      .post("http://localhost:8080/api/product/add", formData, {
        headers: {
          Authorization: "Bearer " + seller_jwtToken, // Replace with your actual JWT token
        },
      })
      .then((resp) => {
        let response = resp.data;

        if (response.success) {
          toast.success(response.responseMessage, {
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
        } else if (!response.success) {
          toast.error(response.responseMessage, {
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
        }, 2000); // Redirect after 3 seconds
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card custom-bg shadow-lg"
          style={{ width: "45rem" }}
        >
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 text-center"
              style={{
                borderRadius: "1em",
                height: "45px",
              }}
            >
              <h5 className="card-title">Add Product</h5>
            </div>
            <div className="card-body text-color">
              <form className="row g-3">
                <div className="col-md-6 mb-3">
                  <label htmlFor="title" className="form-label">
                    <b>Product Title</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="name"
                    onChange={handleInput}
                    value={product.name}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="description" className="form-label">
                    <b>Product Description</b>
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    onChange={handleInput}
                    value={product.description}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Category</b>
                  </label>

                  <select
                    name="categoryId"
                    onChange={handleInput}
                    className="form-control"
                  >
                    <option value="">Select Category</option>

                    {categories.map((category) => {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="quantity" className="form-label">
                    <b>Product Quantity</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    name="quantity"
                    onChange={handleInput}
                    value={product.quantity}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="price" className="form-label">
                    <b>Product Price</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    onChange={handleInput}
                    value={product.price}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="formFile" className="form-label">
                    <b> Select 1st Image</b>
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    name="image1"
                    value={product.image1}
                    onChange={(e) => setSelectImage1(e.target.files[0])}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="formFile" className="form-label">
                    <b> Select 2nd Image</b>
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    name="image2"
                    value={product.image2}
                    onChange={(e) => setSelectImage2(e.target.files[0])}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="formFile" className="form-label">
                    <b> Select 3rd Image</b>
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    name="image3"
                    value={product.image3}
                    onChange={(e) => setSelectImage3(e.target.files[0])}
                    required
                  />
                </div>

                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    onClick={saveProduct}
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
