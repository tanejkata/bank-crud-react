import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const { user } = useAuth();
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get("http://localhost:8080/api/v1/order", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
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

  const formateDate = (currentDate) => {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
    const day = currentDate.getDate().toString().padStart(2, "0");
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.put(
        "http://localhost:8080/api/v1/order/" + id,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className="cart">
      <div className="container">
        <h2 className="mt-3 mb-3">Orders</h2>
        <table className="table table-bordered ">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              {user?.role === "admin" ? (
                <th scope="col">Customer ID</th>
              ) : (
                <></>
              )}
              <th scope="col" style={{ width: "50%" }}>
                Book & Quantity
              </th>
              <th scope="col" style={{ width: "25%" }}>
                Order Date
              </th>
              <th scope="col" style={{ width: "10%" }}>
                Total Price
              </th>
              <th scope="col" style={{ width: "15%" }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((item, index) => (
              <tr key={item._id}>
                <th scope="row">{index + 1}</th>
                {user?.role === "admin" ? (
                  <th scope="row">{item.customer._id}</th>
                ) : (
                  <></>
                )}
                <td>
                  <ul>
                    {item.books.map((book) => {
                      return (
                        <li key={book._id}>
                          {book.book.title + " - " + book.quantity}
                        </li>
                      );
                    })}
                  </ul>
                </td>
                <td>{formateDate(new Date(item.orderDate))}</td>
                <td>{"$" + item.totalAmount}</td>
                <td>
                  <select
                    disabled={!(user?.role === "admin")}
                    className="form-control form-control-sm"
                    name="genre"
                    value={item.status}
                    onChange={(e) => {
                      updateStatus(item._id, e.target.value);
                    }}
                  >
                    <option value="in-progress">In Progress</option>
                    <option value="out-for-deliver">Out For Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
