import { VideoCard } from "../VideoCard/VideoCard";
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
        <div className="fixed top-0 left-0 h-screen w-full z-10 opacity-70 flex justify-center items-center bg-zinc-700">
          <Loader
            type="RevolvingDot"
            color="#2bc48a"
            height={100}
            width={100}
            timeout={2000}
          />
        </div>
      ) : (
        <div className="p-4">
          <aside className="hidden lg:fixed lg:left-0 lg:top-28 lg:flex lg:flex-col lg:p-4 lg:h-2/3 lg:text-center ">
            <NavPane />
          </aside>

          <div className="flex justify-around bg-navbar-color text-black fixed bottom-0 left-0 z-10 w-full py-1 px-0 lg:hidden">
            <NavPane />
          </div>

          <ul className="list-none ml-0 mb-8 justify-center items-center md:flex md:ml-28 md:flex-wrap md:justify-start">
            {videos.map((video) => {
              return (
                <li className="last:pb-1 md:last:pb-0" key={video._id} onClick={() => videoClick(video._id)}>
                  <VideoCard video={video} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {showToast && (
        <div className="toast toast-n" ref={toast}>
          <p>{toastMessage}</p>
          <button className="btn toast-btn">X</button>
        </div>
      )}
    </>
  );
};
