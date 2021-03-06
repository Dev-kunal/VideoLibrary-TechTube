import { useVideo } from "../../Context/VideoProvider";
import "./playlists.css";
import { NavPane } from "../NavPane/NavPane";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { getPlaylists } from "./services";

export const Playlists = () => {
  const { playlists, dispatch } = useVideo();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPlaylists({ setLoading, dispatch });
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
            {playlists.length < 1 ? (
              <div className="mesg">You've Not created any Playlist</div>
            ) : (
              playlists.map((playlist) => (
                <li
                  key={playlist._id}
                  onClick={() => navigate(`/playlists/${playlist._id}`)}
                >
                  <div className="card video-card">
                    <div className="card-img">
                      <img
                        src={
                          playlist.videos.length < 1
                            ? "https://d2uolguxr56s4e.cloudfront.net/img/kartrapages/video_player_placeholder.gif"
                            : playlist.videos[0].thumbnail
                        }
                        alt="thumbanil"
                        height="100%"
                        width="100%"
                      />
                      <div className="video-overlay"></div>
                    </div>
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

                    <h4>{playlist.playlistName}</h4>
                  </div>
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
