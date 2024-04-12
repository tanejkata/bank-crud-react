import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";

import { useNavigate, createSearchParams } from "react-router-dom";

function Dashboard() {
  const { addItemToCart } = useCart();
  const { user } = useAuth();
  const { showNotification } = useApp();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get("http://localhost:8080/api/v1/book", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const bookList = [];
      response.data.forEach((element) => {
        bookList.push({ book: element, quantity: 1 });
      });
      setBooks(bookList);
    } else {
      window.location.href = "/login";
    }
  };

  const fetchBooks = async (e) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          `http://localhost:8080/api/v1/book/search?search=${e}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const bookList = [];
        response.data.forEach((element) => {
          bookList.push({ book: element, quantity: 1 });
        });
        setBooks(bookList);
      } else {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    fetchBooks(e.target.value);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      window.location = "/login";
    }
  }, []);

  const handleAddClick = (b) => {
    // setTimeout(() => {
    //   setShowNotification("");
    // }, 2000);
    // setShowNotification(b._id);
    showNotification('"' + b.title + '" added to cart', "success");
    addItemToCart(b);
  };

  const handleUpdateClick = (b) => {
    navigate({
      pathname: "/updatebook",
      search: createSearchParams({
        id: b._id,
      }).toString(),
    });
  };

  return (
    <div className="container mt-5">
      <div className="container d-flex mb-5">
        <input
          className="form-control w-50 mx-auto"
          type="search"
          value={searchTerm}
          placeholder="Search for book, genre & author"
          aria-label="Search"
          onChange={handleChange}
        />
      </div>
      <div className="row">
        {books.map((element) => (
          <div key={element.book._id} className="col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <img
                  src={element.book.imageURL || require("../assests/book.jpg")}
                  className="card-img-top"
                  alt={element.book.title}
                  width="80"
                  height="200px"
                />
                <h5 className="card-title mt-2">{element.book.title}</h5>
                <p className="card-text">
                  <strong>Author:</strong> {element.book.author}
                </p>
                <p className="card-text">
                  <strong>Genre:</strong> {element.book.genre}
                </p>
                <p className="card-text">
                  <strong>Price:</strong>
                  {element.book.price}
                </p>
                <p className="card-text">
                  <strong>Available Quantity:</strong>{" "}
                  {element.book.stockQuantity}
                </p>
                <div>
                  <div className="d-flex">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddClick(element.book)}
                    >
                      Add
                    </button>
                    {user?.role === "admin" ? (
                      <button
                        style={{ marginLeft: 10 }}
                        className="btn btn-primary"
                        onClick={() => handleUpdateClick(element.book)}
                      >
                        Update
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
