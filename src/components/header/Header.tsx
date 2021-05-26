import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { storage } from "utils";
import { useStoreActions } from "hooks";

const Header = () => {
  const { logout } = useStoreActions((action) => action.auth);

  const [connected, setConnected] = useState(false);
  const [connectedUser, setConnectedUser] = useState({} as any);
  useEffect(() => {
    const token = storage.get("jwtToken");
    const user = storage.get("currentUser");
    if (token) {
      setConnected(true);
    }
    if (user) {
      setConnectedUser(user);
    }
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <span className="navbar-brand">FlighHigh Airlines</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {connected ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/booking">
                    Booking
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/checkin">
                    Checkin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/manage-booking">
                    Manage booking
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/flight-information">
                    Flight information
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>{" "}
              </>
            ) : null}
          </ul>
          <ul className="navbar-nav">
            {connected ? (
              <>
                <li className="nav-item">
                  <span
                    style={{ cursor: "pointer" }}
                    className="nav-link"
                    onClick={() => logout()}
                  >
                    Logout
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    style={{ cursor: "pointer" }}
                    className="nav-link"
                    // onClick={() => logout()}
                  >
                    <i className="fa fa-user"></i> {connectedUser.firstName}
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
