import { NavPane } from "../Components/NavPane/NavPane";
import { useNavigate } from "react-router-dom";
import { useVideo } from "../Context/VideoProvider";
import { useState, useEffect } from "react";
import { UseAxios } from "../Utils/UseAxios";
import { baseUrl } from "../Utils/ApiEndpoints";
import Loader from "react-loader-spinner";
import { VideoCard } from "./VideoCard/VideoCard";

export const LikedVideos = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { likedVideos, dispatch } = useVideo();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { likedVideos } = await UseAxios("GET", `/videos/liked`);
        dispatch({
          type: "SET_LIKED_VIDEOS",
          payload: { likedVideos: likedVideos.map((video) => video.videoId) },
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      {loading ? (
        <div className="loader-container">
          <Loader
            type="RevolvingDot"
            color="#2bc48a"
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      ) : (
        <div className="liked-videos-page" style={{ padding: "1rem" }}>
          <div className="sidebar">
            <NavPane />
          </div>
          <ul className="video-container">
            {likedVideos.length < 1 ? (
              <div className="mesg">You've not like a video yet</div>
            ) : (
              likedVideos.map((video) => (
                <li
                  key={video._id}
                  onClick={() => navigate(`/watch/${video._id}`)}
                >
                  <VideoCard video={video} />
                </li>
              ))
            )}
          </ul>

          <div className="mobile-nav">
            <NavPane />
          </div>
        </div>
      )}
    </>
  );
};
