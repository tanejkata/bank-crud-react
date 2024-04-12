import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
import UpdateBook from "./components/updateBook";
import Orders from "./components/Orders";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";

import AddBook from "./components/AddBook";

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/addbook" element={<AddBook />} />
            <Route path="/updatebook" element={<UpdateBook />} />
            <Route path="/order" element={<Orders />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
