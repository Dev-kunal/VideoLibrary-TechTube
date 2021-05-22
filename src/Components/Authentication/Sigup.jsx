import { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
export const Signup = () => {
  const [validation, setValidation] = useState("");
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevdetails) => {
      return {
        ...prevdetails,
        [name]: value,
      };
    });
  };
  const handleFormSubmit = (event) => {
    if (userDetails.password === userDetails.confirmPassword) {
      // submit form
    } else {
      setValidation("Password and Confirm password must be same");
      event.preventDefault();
    }
  };
  return (
    <div className="login-page">
      <div className="form-container">
        <div className="form-header">
          <h2 style={{ margin: "1rem auto" }}>Sign-Up</h2>
        </div>
        <form
          onSubmit={(event) => handleFormSubmit(event)}
          className="auth-form"
        >
          <div class="input-group">
            <label class="input-label" for="input-uname">
              Username
            </label>
            <input
              class="input input-lg"
              type="text"
              id="input-uname"
              placeholder="username"
              required
              name="username"
              onChange={(event) => handleInputChange(event)}
              value={userDetails.username}
            />
          </div>
          <div class="input-group">
            <label class="input-label" for="input-pass">
              Password
            </label>
            <input
              class="input input-lg"
              type="password"
              id="input-pass"
              placeholder="password"
              name="password"
              onChange={(event) => handleInputChange(event)}
              required
              value={userDetails.password}
            />
          </div>
          <div class="input-group">
            <label class="input-label" for="input-pass">
              Confirm Password
            </label>
            <input
              class="input input-lg"
              type="password"
              id="input-pass"
              name="confirmPassword"
              onChange={(event) => handleInputChange(event)}
              value={userDetails.confirmPassword}
              placeholder="password"
              required
            />
            <small style={{ color: "red" }}>{validation}</small>
          </div>
          <button type="submit" className="btn btn-lg">
            Sign-Up
          </button>
          <br />
          <span>
            <small>
              {" "}
              Already a member..? <Link to="/login">Login</Link>
            </small>
          </span>
        </form>
      </div>
    </div>
  );
};
