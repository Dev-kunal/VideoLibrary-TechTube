import { useVideo } from "../../Context/VideoProvider";
import "./playlists.css";
import { NavPane } from "../NavPane/NavPane";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UseAxios } from "../../Utils/UseAxios";
import { baseUrl } from "../../Utils/ApiEndpoints";
import Loader from "react-loader-spinner";

export const Playlists = () => {
  const { playlists, videos, dispatch } = useVideo();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { playlists } = await UseAxios("GET", `${baseUrl}/playlist`);
        console.log(playlists);
        dispatch({
          type: "SET_PLAYLISTS",
          payload: { playlists: playlists },
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
            timeout={2000}
          />
        </div>
      ) : (
        <div className="playlists-page">
          <div className="sidebar">
            <NavPane />
          </div>
          <ul className="video-container">
            {playlists.length < 1
              ? "T=YOuve not created any playlist"
              : playlists.map((playlist) => (
                  <li key={playlist._id}>
                    <div
                      className="card video-card"
                      onClick={() => navigate(`/playlists/${playlist._id}`)}
                    >
                      <img
                        src={
                          playlist.videos.length < 1
                            ? "https://d2uolguxr56s4e.cloudfront.net/img/kartrapages/video_player_placeholder.gif"
                            : playlist.videos[0].thumbnail
                        }
                        alt="thumbanil"
                        height="auto"
                        width="100%"
                      />
                      <div className="playlist-count">
                        <span>{playlist.videos.length}</span>
                        <svg
                          className="MuiSvgIcon-root"
                          focusable="false"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M4 10h12v2H4zm0-4h12v2H4zm0 8h8v2H4zm10 0v6l5-3z"></path>
                        </svg>
                      </div>
                      <div className="video-overlay"></div>
                      <h4>{playlist.playlistName}</h4>
                    </div>
                  </li>
                ))}
          </ul>

          <div className="mobile-nav">
            <NavPane />
          </div>
        </div>
      )}
    </>
  );
};
