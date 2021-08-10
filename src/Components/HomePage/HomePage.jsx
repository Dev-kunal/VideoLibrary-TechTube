import { VideoCard } from "../VideoCard/VideoCard";
import "./homepage.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavPane } from "../NavPane/NavPane";
import { useVideo } from "../../Context/VideoProvider";
import Loader from "react-loader-spinner";
import { useAuth } from "../../Context/UserProvider";
import { getVideos } from "./services";

export const HomePage = () => {
  const { videos, dispatch, showToast, toastMessage } = useVideo();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 2000);
  }
  const videoClick = (id) => {
    if (token) {
      navigate(`/watch/${id}`);
    } else {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: "You'll have to login first..!" },
      });
      navigate("/login");
    }
  };
  useEffect(() => {
    if (videos.length <= 0) {
      getVideos({ setLoading, dispatch });
    }
  }, []);
  const navigate = useNavigate();
  return (
    <>
      {loading ? (
        <div className="loader-container">
          <Loader
            type="RevolvingDot"
            color="#2bc48a"
            height={100}
            width={100}
            timeout={2000}
          />
        </div>
      ) : (
        <div className="homepage">
          <aside className="sidebar">
            <NavPane />
          </aside>

          <div className="mobile-nav">
            <NavPane />
          </div>

          <ul className="video-container">
            {videos.map((video) => {
              return (
                <li key={video._id} onClick={() => videoClick(video._id)}>
                  <VideoCard video={video} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {showToast && (
        <div class="toast toast-n" ref={toast}>
          <p>{toastMessage}</p>
          <button class="btn toast-btn">X</button>
        </div>
      )}
    </>
  );
};
