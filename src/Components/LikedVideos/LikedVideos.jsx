import { useNavigate } from "react-router-dom";
import { useVideo } from "../../Context/VideoProvider";
import { useState, useEffect } from "react";
import { UseAxios } from "../../Utils/UseAxios";
import Loader from "react-loader-spinner";

import { NavPane, VideoCard } from "..";
import { getLikedVideos } from "./services";

export const LikedVideos = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { likedVideos, dispatch } = useVideo();

  useEffect(() => {
    getLikedVideos({ setLoading, dispatch });
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
