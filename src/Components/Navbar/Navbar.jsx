import { useState } from "react";
import "./navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchClick = (searchTerm) => {
    // make search according to searchTerm
    setShowSearch(!showSearch);
  };
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

      {showSearch && (
        <input
          autoFocus
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="search-bar input line-input input-md"
          placeholder="&#xF002; Search"
          type="text"
          style={{ fontFamily: "Arial,FontAwesome", color: "#181818" }}
        />
      )}
      <div className="nav-group">
        <div className="nav-item">
          <button
            className="search-btn"
            onClick={() => handleSearchClick(searchTerm)}
          >
            {" "}
            <i className="fa fa-search" />
          </button>
        </div>
        <div>
          <Link to="/user">
            <img
              className="avatar-small xs user"
              src="https://cdn2.iconfinder.com/data/icons/flatfaces-everyday-people-square/128/beard_male_man_face_avatar-512.png"
              alt="Avatar"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
