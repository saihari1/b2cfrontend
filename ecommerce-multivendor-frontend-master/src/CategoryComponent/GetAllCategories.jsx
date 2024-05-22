import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const GetAllCategories = () => {
  const [categories, setCategories] = useState([]);
  const api_Url = process.env.REACT_APP_API_URL;
  const retrieveAllCategories = async () => {
    const response = await axios.get(
      `${api_Url}/api/category/fetch/all?start=0&count=12`
    );
    return response.data;
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const allCategories = await retrieveAllCategories();
      if (allCategories) {
        setCategories(allCategories.categories);
      }
    };

    getAllCategories();
  }, []);

  return (
    <div className="list-group form-card border-color">
      <Link
        to="/home/all/product/categories"
        className="list-group-item list-group-item-action bg-color custom-bg-text"
      >
        <b>All Categories</b>
      </Link>

      {categories.map((category) => {
        return (
          <Link
            to={`/home/product/category/${category.id}/${category.name}`}
            className="list-group-item list-group-item-action text-color custom-bg"
          >
            <b>{category.name}</b>
          </Link>
        );
      })}
    </div>
  );
};

export default GetAllCategories;
