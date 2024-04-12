import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

const UpdateBook = () => {
  const [state] = useSearchParams();
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    stockQuantity: "",
    genre: "",
    imageURL: "",
  });

  if (state.size !== 0) {
  } else {
    window.location = "/dashboard";
  }

  const { showNotification } = useApp();

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get(
        "http://localhost:8080/api/v1/book/" + state.get("id"),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBook(response?.data);
    } else {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      window.location = "/login";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:8080/api/v1/book/update/${state.get("id")}`,
        {
          book,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        showNotification("book updated successfully", "success");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      }
    } catch (err) {}
  };

  return (
    <div className="container">
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Add Book</h2>
                    <p className="text-white-50 mb-5">
                      Please enter the following details
                    </p>

                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-4">
                        <input
                          type="text"
                          id="typeEmailX"
                          name="title"
                          className="form-control form-control-lg"
                          placeholder="Title"
                          value={book.title}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group mb-4">
                        <input
                          type="text"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                          placeholder="Author"
                          name="author"
                          value={book.author}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group mb-4">
                        <input
                          type="number"
                          className="form-control form-control-lg"
                          placeholder="Price"
                          name="price"
                          value={book.price}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group mb-4">
                        <input
                          type="number"
                          className="form-control form-control-lg"
                          placeholder="Stock Quantity"
                          name="stockQuantity"
                          min={0}
                          value={book.stockQuantity}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group mb-4">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="ImageURL"
                          name="imageURL"
                          value={book.imageURL}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group mb-4">
                        <select
                          className="form-control form-control-lg"
                          name="genre"
                          value={book.genre}
                          onChange={handleChange}
                        >
                          <option value="Other">Open this select menu</option>
                          <option value="Fiction">Fiction</option>
                          <option value="Non-Fiction">Non-Fiction</option>
                          <option value="Science Fiction">
                            Science Fiction
                          </option>
                          <option value="Mystery">Mystery</option>
                          <option value="Romance">Romance</option>
                          <option value="Horror">Horror</option>
                          <option value="Thriller">Thriller</option>
                          <option value="Historical">Historical</option>
                          <option value="Biography">Biography</option>
                          <option value="Poetry">Poetry</option>
                          <option value="Fantasy">Fantasy</option>
                          <option value="Adventure">Adventure</option>
                          <option value="Self-Help">Self-Help</option>
                          <option value="Health">Health</option>
                          <option value="Cooking">Cooking</option>
                          <option value="History">History</option>
                          <option value="Science">Science</option>
                          <option value="Art">Art</option>
                          <option value="Business">Business</option>
                          <option value="Travel">Travel</option>
                          <option value="Children">Children</option>
                          <option value="Religion">Religion</option>
                          <option value="Philosophy">Philosophy</option>
                          <option value="Sports">Sports</option>
                          <option value="Music">Music</option>
                          <option value="Comics">Comics</option>
                          <option value="Drama">Drama</option>
                          <option value="Education">Education</option>
                          <option value="Technology">Technology</option>
                          <option value="Psychology">Psychology</option>
                          <option value="Humor">Humor</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <button
                        className="btn btn-outline-light btn-lg px-5 mt-3"
                        type="submit"
                      >
                        Update Book
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdateBook;
