import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
    } else {
      window.location.href = "/login";
    }
  });
  const {
    cartItems,
    removeItemFromCart,
    getCartTotal,
    updateItemFromCart,
    checkout,
  } = useCart();

  const updateCart = (val, id) => {
    console.log(val, id);
    updateItemFromCart(id, Number(val));
  };

  return (
    <div className="cart">
      <div className="container">
        <h2 className="mt-3 mb-3">Shopping Cart</h2>

        <table className="table table-bordered ">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col" style={{ width: "60%" }}>
                Name
              </th>
              <th scope="col" style={{ width: "15%" }}>
                Quantity
              </th>
              <th scope="col" style={{ width: "15%" }}>
                Price
              </th>
              <th scope="col" style={{ width: "10%" }}>
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.item.title}</td>

                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    max={5}
                    onChange={(e) => updateCart(e.target.value, item.item._id)}
                  />
                </td>
                <td>
                  {"$"}
                  {item.quantity * Number(item.item.price.toFixed(2))}
                </td>
                <td>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => removeItemFromCart(item.item._id)}
                    title="Delete"
                  >
                    <i className="bi bi-trash" style={{ color: "red" }}></i>
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <th scope="row"></th>
              <td colSpan="2">Total</td>
              <td>${getCartTotal()}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => checkout()}
                  disabled={cartItems.length === 0}
                >
                  Checkout
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
