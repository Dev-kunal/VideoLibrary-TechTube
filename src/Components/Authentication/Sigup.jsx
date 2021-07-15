import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import { UseAxios } from "../../Utils/UseAxios";
import { baseUrl } from "../../Utils/ApiEndpoints";
import { useVideo } from "../../Context/VideoProvider";
import Loader from "react-loader-spinner";
export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const { showToast, toastMessage, dispatch } = useVideo();
  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 2000);
  }

  const [userDetails, setUserDetails] = useState({
    email: "",
    fullname: "",
    username: "",
    password: "",
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
    event.preventDefault();
    setLoading(true);
    (async () => {
      try {
        const { success, message } = await UseAxios(
          "POST",
          `/user/signup`,
          userDetails
        );
        console.log(success, message);
        setLoading(false);
        if (!success) {
          dispatch({
            type: "SHOW_TOAST",
            payload: { message: message },
          });
        } else {
          dispatch({
            type: "SHOW_TOAST",
            payload: { message: message },
          });
          setUserDetails({
            username: "",
            password: "",
            fullname: "",
            email: "",
          });
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    })();
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
            <label class="input-label" for="input-email">
              Email
            </label>
            <input
              class="input input-lg"
              type="email"
              id="input-email"
              placeholder="user@gmail.com"
              required
              name="email"
              onChange={(event) => handleInputChange(event)}
              value={userDetails.email}
            />
          </div>
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
            <label class="input-label" for="input-fullname">
              Full Name
            </label>
            <input
              class="input input-lg"
              type="text"
              id="input-fullname"
              placeholder="Full name"
              required
              name="fullname"
              onChange={(event) => handleInputChange(event)}
              value={userDetails.fullname}
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
