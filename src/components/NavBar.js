import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/AuthContext";
const NavBar = () => {
  const { logout, isAuthenticated, user } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
      {/* eslint-disable-next-line */}
      <a className="navbar-brand">Bookstore</a>
      <div className="collapse navbar-collapse w-100" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {!isAuthenticated ? (
            <Link className="nav-item nav-link " to={"/login"}>
              Login
            </Link>
          ) : null}
          {!isAuthenticated ? (
            <Link className="nav-item nav-link" to={"/register"}>
              Register
            </Link>
          ) : null}
          {isAuthenticated && user?.role === "admin" ? (
            <>
              <Link className="nav-item nav-link" to="/addbook">
                Add Book
              </Link>
            </>
          ) : null}
          {isAuthenticated ? (
            <>
              <Link className="nav-item nav-link" to="/dashboard">
                dashboard
              </Link>
              <Link className="nav-item nav-link" to="/cart">
                cart
              </Link>
              <Link className="nav-item nav-link" to="/order">
                orders
              </Link>
              <Link className="nav-item nav-link" onClick={logout}>
                Logout
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
