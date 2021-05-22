import { useNavigate } from "react-router";
import { useAuth } from "../../Context/UserProvider";
import { useVideo } from "../../Context/VideoProvider";
import { NavPane } from "../NavPane/NavPane";
import "./user.css";
export const User = () => {
  const { userDispatch } = useAuth();
  const { dispatch } = useVideo();
  const navigate = useNavigate();
  // const {dispatch}=useVideo

  const logout = () => {
    console.log("logout Clikced");
    userDispatch({
      type: "SET_LOGIN",
      payload: { login: false, user: null },
    });
    dispatch({
      type: "LOGOUT",
    });
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="user-page">
      <div className="sidebar">
        <NavPane />
      </div>
      <div className="user-container">
        <h3>
          This is user page
          <ul>
            <li>Edit Acoount Settings</li>
          </ul>
        </h3>
        <button onClick={logout} className="btn btn-lg">
          Logout
        </button>
      </div>
      <div className="mobile-nav">
        <NavPane />
      </div>
    </div>
  );
};
