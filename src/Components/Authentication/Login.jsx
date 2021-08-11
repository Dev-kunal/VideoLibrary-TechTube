import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "react-loader-spinner";
import "./auth.css";
import { useAuth } from "../../Context/UserProvider";
import { useVideo } from "../../Context/VideoProvider";
import { loginUser } from "./services";

export const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userDispatch } = useAuth();
  const toast = useRef(null);
  const { showToast, toastMessage, dispatch } = useVideo();
  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 2000);
  }

  const [userDetails, setUserDetails] = useState({
    username: "raj",
    password: "raj",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevdetails) => {
      return {
        ...prevdetails,
        [name]: value,
      };
    });
  };
  const formSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const res = await loginUser({
      userDetails,
      dispatch,
      userDispatch,
      setLoading,
    });
    if (res) {
      setUserDetails({
        username: "",
        password: "",
      });
      navigate(state?.from ? state.from : "/");
    }
  };
  return (
    <div className="login-page">
      <div className="form-container">
        <div className="form-header">
          <h2 style={{ margin: "1rem auto" }}>Login</h2>
        </div>
        <form onSubmit={(event) => formSubmit(event)} className="auth-form">
          <div className="input-group">
            <label className="input-label" htmlFor="input-uname">
              Username
            </label>
            <input
              className="input input-lg"
              type="text"
              id="input-uname"
              placeholder="username"
              name="username"
              required
              value={userDetails.username}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="input-pass">
              Password
            </label>
            <input
              className="input input-lg"
              type="password"
              id="input-pass"
              placeholder="password"
              name="password"
              required
              value={userDetails.password}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <button type="submit" className="btn auth-btn">
            Login
          </button>
          <br />
          <span>
            <small>
              Not a member..? <Link to="/signup">Signup</Link>
            </small>
          </span>
        </form>
      </div>
      {loading && (
        <div className="loader-container">
          <Loader
            type="RevolvingDot"
            color="#2bc48a"
            height={100}
            width={100}
            timeout={2000}
          />
        </div>
      )}
      {showToast && (
        <div className="toast toast-n" ref={toast}>
          <p>{toastMessage}</p>
          <button className="btn toast-btn">X</button>
        </div>
      )}
    </div>
  );
};
