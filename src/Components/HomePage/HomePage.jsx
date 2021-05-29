import { VideoCard } from "../VideoCard/VideoCard";
import "./homepage.css";
import { useEffect, useState } from "react";
import { baseUrl } from "../../Utils/ApiEndpoints";
import { UseAxios } from "../../Utils/UseAxios";
import { useNavigate } from "react-router-dom";
import { NavPane } from "../NavPane/NavPane";
import { useVideo } from "../../Context/VideoProvider";
import Loader from "react-loader-spinner";

export const HomePage = () => {
  const { videos, dispatch } = useVideo();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { videos } = await UseAxios("GET", `${baseUrl}/videos`);

        dispatch({
          type: "SET_VIDEOS",
          payload: { videos: videos },
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
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
                <li
                  key={video._id}
                  onClick={() => navigate(`/watch/${video._id}`)}
                >
                  <VideoCard video={video} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};
