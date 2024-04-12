import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";

function Checkout() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "To Kill a Mockingbird",
      price: "$10.99",
      imageUrl: "https://via.placeholder.com/150",
      stockQuantity: 12,
    },
    {
      id: 2,
      title: "The Great Gatsby",
      price: "$12.99",
      imageUrl: "https://via.placeholder.com/150",
      stockQuantity: 10,
    },
    {
      id: 3,
      title: "1984",
      price: "$9.99",
      imageUrl: "https://via.placeholder.com/150",
      stockQuantity: 9,
    },
    {
      id: 4,
      title: "The Catcher in the Rye",
      price: "$11.99",
      imageUrl: "https://via.placeholder.com/150",
      stockQuantity: 8,
    },
    {
      id: 5,
      title: "Lord of the Flies",
      price: "$8.99",
      imageUrl: "https://via.placeholder.com/150",
      stockQuantity: 13,
    },
    {
      id: 6,
      title: "Brave New World",
      price: "$14.99",
      imageUrl: "https://via.placeholder.com/150",
      stockQuantity: 11,
    },
    {
      id: 7,
      title: "The Hobbit",
      price: "$13.99",
      imageUrl: "https://via.placeholder.com/150",
      stockQuantity: 15,
    },
    {
      id: 8,
      title: "Animal Farm",
      price: "$10.49",
      imageUrl: "https://via.placeholder.com/150",
      stockQuantity: 9,
    },
    {
      id: 9,
      title: "Pride and Prejudice",
      price: "$9.49",
      imageUrl: "https://via.placeholder.com/150",
      stockQuantity: 5,
    },
    {
      id: 10,
      title: "The Da Vinci Code",
      price: "$15.99",
      imageUrl: "https://via.placeholder.com/150",
      stockQuantity: 8,
    },
  ]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [quantityToAdd, setQuantityToAdd] = useState(1);

  // Function to handle "Add" button click
  const handleAddClick = (book) => {
    setSelectedBook(book);
    setModalShow(true);
  };

  // Function to handle quantity input change
  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setQuantityToAdd(value);
    }
  };

  // Function to handle adding quantity to selected book
  const handleAddQuantity = () => {
    if (quantityToAdd <= selectedBook.quantity) {
      const updatedBooks = books.map((book) =>
        book.id === selectedBook.id
          ? { ...book, quantity: book.quantity + quantityToAdd }
          : book
      );
      setBooks(updatedBooks);
      setModalShow(false);
    } else {
      alert("Cannot add more than initial quantity.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {books.map((book) => (
          <div key={book.id} className="col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <img
                  src={book.imageUrl}
                  className="card-img-top"
                  alt={book.title}
                />
                <h5 className="card-title mt-2">{book.title}</h5>
                <p className="card-text">Price: {book.price}</p>
                <p className="card-text">Quantity: {book.stockQuantity}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddClick(book)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBook && selectedBook.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Price: {selectedBook && selectedBook.price}</p>
          <input
            type="number"
            className="form-control"
            value={quantityToAdd}
            onChange={handleQuantityChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddQuantity}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Checkout;
