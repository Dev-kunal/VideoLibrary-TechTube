import { useState } from "react";
import "./navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../Context/UserProvider";

export const Navbar = () => {
  const { token } = useAuth();

  return (
    <div className="navbar navbar-right">
      <div className="nav-brand">
        <img
          src="/Images/technology-products.svg"
          className="brand-img"
          alt="brand"
        />
        <Link className="nav-brand-heading" to="/">
          Tech<span style={{ color: "var(--myColor)" }}>Tube</span>
        </Link>
      </div>
      <div className={token ? "nav-group" : "nav-group-baseline"}>
        <div>
          {token ? (
            <Link to="/user">
              <img
                className="avatar-small xs user"
                src="https://cdn2.iconfinder.com/data/icons/flatfaces-everyday-people-square/128/beard_male_man_face_avatar-512.png"
                alt="Avatar"
              />
            </Link>
          ) : (
            <Link to="/login" className="login-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
