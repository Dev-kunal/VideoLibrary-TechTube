import { useNavigate } from "react-router";
import { useAuth } from "../../Context/UserProvider";
import { useVideo } from "../../Context/VideoProvider";
import { NavPane } from "../NavPane/NavPane";
import "./user.css";
export const User = () => {
  const { userDispatch } = useAuth();
  const { dispatch } = useVideo();
  const navigate = useNavigate();
  const { user } = useAuth();

  const logout = () => {
    userDispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <div className="user-page">
      <div className="sidebar">
        <NavPane />
      </div>
      <div className="user-container">
        <div class="user-div">
          <img
            class="avatar-small"
            src="https://cdn2.iconfinder.com/data/icons/flatfaces-everyday-people-square/128/beard_male_man_face_avatar-512.png"
            alt="Avatar"
          />
          <span>
            Hello <span style={{ fontSize: "x-large" }}>{user.username}</span>
          </span>
          <button
            class="btn btn-secondary user-action-btn"
            onClick={() => navigate("/playlists")}
          >
            See your playlists
          </button>
          <button
            class="btn btn-secondary user-action-btn"
            onClick={() => navigate("/likedvideos")}
          >
            See your liked Videos
          </button>
          <button class="btn user-action-btn" onClick={() => logout()}>
            Log-out
          </button>
        </div>
      </div>
      <div className="mobile-nav">
        <NavPane />
      </div>
    </div>
  );
};
