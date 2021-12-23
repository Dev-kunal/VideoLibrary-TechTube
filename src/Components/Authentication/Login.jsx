import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "react-loader-spinner";
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
      // @ts-ignore
      navigate(state?.from ? state.from : "/");
    }
  };
  return (
    <div className="flex justify-center items-center h-full my-20">
      <div className="border border-primary-color p-5">
        <div className="w-full text-center">
          <h2 className="mx-auto text-2xl font-bold text-primary-color">Login</h2>
        </div>
        <form onSubmit={(event) => formSubmit(event)} className="text-primary-color p-5">
          <div className="min-w-40 mb-4">
            <label className="mb-9" htmlFor="input-uname">
              Username
            </label>
            <input
              className="text-md p-2 w-11/12 mb-1 outline-primary-color rounded-sm text-black border border-slate-400"
              type="text"
              id="input-uname"
              placeholder="username"
              name="username"
              required
              value={userDetails.username}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <div className="min-w-40 mb-3">
            <label className="mb-9" htmlFor="input-pass">
              Password
            </label>
            <input
              className="text-md p-2 w-11/12 mb-1 outline-primary-color rounded-sm text-black border border-slate-400"
              type="password"
              id="input-pass"
              placeholder="password"
              name="password"
              required
              value={userDetails.password}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
          <button type="submit" className="py-2 bg-primary-color w-11/12 rounded-md text-white font-bold">
            Login
          </button>
          <br />
          <span>
            <small className="text-slate-500">
              Not a member..? <Link to="/signup" className="hover:text-primary-color underline">Signup</Link>
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
        <div className="toast toast-n" ref={toast}>
          <p>{toastMessage}</p>
          <button className="btn toast-btn">X</button>
        </div>
      )}
    </div>
  );
};
