import { useVideo } from "../../Context/VideoProvider";
import "./playlists.css";
import { NavPane } from "../NavPane/NavPane";
import { useNavigate } from "react-router-dom";

export const Playlists = () => {
  const { playlists, videos } = useVideo();
  const navigate = useNavigate();

  const getFirstVideo = (playlist) => {
    return playlist.itemsInPlaylist[0];
  };
  // const getVideoId = (videoUrl) => {
  //   return videos.find((video) => video.url === videoUrl)?.id;
  // };
  const getThumbnail = (videoUrl) => {
    return videos.find((video) => video.url === videoUrl)?.thumbnail;
  };
  return (
    <div className="playlists-page">
      <div className="playlist-container">
        <div className="sidebar">
          <NavPane />
        </div>
        <ul className="video-container">
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              {console.log(playlists)}
              {console.log(playlist)}
              <div
                className="card video-card"
                onClick={() => navigate(`/playlists/${playlist.id}`)}
              >
                <img
                  src={getThumbnail(getFirstVideo(playlist))}
                  alt="thumbanil"
                  height="auto"
                  width="100%"
                />
                <div className="playlist-count">
                  <span>{playlist.itemsInPlaylist.length}</span>
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
                <h4>{playlist.name}</h4>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mobile-nav">
        <NavPane />
      </div>
    </div>
  );
};
