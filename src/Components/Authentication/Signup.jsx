import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useVideo } from "../../Context/VideoProvider";
import Loader from "react-loader-spinner";
import { signUpUser } from "./services";
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
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const res = await signUpUser({ dispatch, setLoading, userDetails });
    if (res) {
      setUserDetails({
        username: "",
        password: "",
        fullname: "",
        email: "",
      });
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="border border-primary-color p-5 mt-3 rounded-lg">
        <div className="w-full text-center">
          <h2 className="mx-auto text-2xl font-bold text-primary-color">Sign-Up</h2>
        </div>
        <form
          onSubmit={(event) => handleFormSubmit(event)}
          className="text-primary-color p-5"
        >
          <div className="min-w-40 mb-4">
            <label className="mb-9" htmlFor="input-email">
              Email
            </label>
            <input
              className="text-md p-2 w-11/12 mb-1 outline-primary-color rounded-sm text-black border border-slate-400"
              type="email"
              id="input-email"
              placeholder="user@gmail.com"
              required
              name="email"
              onChange={(event) => handleInputChange(event)}
              value={userDetails.email}
            />
          </div>
          <div className="min-w-40 mb-4">
            <label className="mb-9" htmlFor="input-uname">
              Username
            </label>
            <input
              className="text-md p-2 w-11/12 mb-1 outline-primary-color rounded-sm text-black border border-slate-400"
              type="text"
              id="input-uname"
              placeholder="username"
              required
              name="username"
              onChange={(event) => handleInputChange(event)}
              value={userDetails.username}
            />
          </div>
          <div className="min-w-40 mb-4">
            <label className="mb-9" htmlFor="input-fullname">
              Full Name
            </label>
            <input
              className="text-md p-2 w-11/12 mb-1 outline-primary-color rounded-sm text-black border border-slate-400"
              type="text"
              id="input-fullname"
              placeholder="Full name"
              required
              name="fullname"
              onChange={(event) => handleInputChange(event)}
              value={userDetails.fullname}
            />
          </div>
          <div className="min-w-40 mb-4">
            <label className="mb-9" htmlFor="input-pass">
              Password
            </label>
            <input
              className="text-md p-2 w-11/12 mb-1 outline-primary-color rounded-sm text-black border border-slate-400"
              type="password"
              id="input-pass"
              placeholder="password"
              name="password"
              onChange={(event) => handleInputChange(event)}
              required
              value={userDetails.password}
            />
          </div>
          <button type="submit" className="py-2 bg-primary-color w-11/12 rounded-md text-white font-bold outline-primary-color">
            Sign-Up
          </button>
          <br />
          <span className="mt-1">
            <small className="text-slate-500">
              Already a member..? <Link to="/login" className="hover:text-primary-color underline">Login</Link>
            </small>
          </span>
        </form>
      </div>
      {loading && (
        <div className="fixed top-0 left-0 h-screen w-full z-10 opacity-70 flex justify-center items-center bg-zinc-700">
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
        <div className="flex items-baseline justify-between absolute bottom-8 right-8 border border-primary-color text-white rounded-md bg-primary-color p-2 text-sm " ref={toast}>
          <p>{toastMessage}</p>
        </div>
      )}
    </div>
  );
};
