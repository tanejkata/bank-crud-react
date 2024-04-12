import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState } from "react";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: 0,
    stockQuantity: 0,
    genre: "Other",
    imageURL: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/v1/book/create",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response) {
        // Redirect to dashboard or home page after successful login
        window.location.href = "/dashboard";
      }
    } catch (err) {
      //   setError(err.response.data.message);
    }
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
                          value={formData.title}
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
                          value={formData.author}
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
                          value={formData.price}
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
                          value={formData.stockQuantity}
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
                          value={formData.imageURL}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group mb-4">
                        <select
                          className="form-control form-control-lg"
                          name="genre"
                          value={formData.genre}
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
                        Add Book
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

export default AddBook;
