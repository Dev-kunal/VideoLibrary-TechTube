import { useNavigate, useParams } from "react-router-dom";
import { useVideo } from "../Context/reducer";
import { NavPane } from "../Components/NavPane/NavPane";

export const Playlist = () => {
  const { playlists, videos } = useVideo();
  const { playlistId } = useParams();
  const navigate = useNavigate();

  const videosInPlaylist = playlists.find(
    (playlist) => playlist.id === parseInt(playlistId, 10)
  )?.itemsInPlaylist;

  console.log(videosInPlaylist);
  const getVideo = (videoUrl) => {
    const video = videos.find((video) => video.url === videoUrl);
    return video;
  };
  return (
    <div style={{ padding: "2rem", marginLeft: "6rem" }}>
      <div className="sidebar">
        <NavPane />
      </div>
      <ul className="list">
        {videosInPlaylist.map((videoUrl) => (
          <div
            className="card video-card"
            onClick={() => navigate(`/watch/${getVideo(videoUrl).id}`)}
          >
            <div className="card-img">
              <img
                height="auto"
                width="100%"
                src={getVideo(videoUrl).thumbnail}
                alt="thumbnail"
              />
            </div>
            <div className="video-text-container">
              <img
                className="avatar-small xs"
                src="https://yt3.ggpht.com/ytc/AAUvwnhyHW7QINneXdZPEHNEl3kUIh7giLIaRrwk4CFXeA=s88-c-k-c0x00ffffff-no-rj"
                alt="Avatar"
              />
              <div className="video-text">
                <h4>{getVideo(videoUrl).name} </h4>
                <span className="small">Beebom</span>
                <br />
                <span className="small">{getVideo(videoUrl).views} views</span>
              </div>
            </div>
          </div>
        ))}
      </ul>
      <div className="mobile-nav">
        <NavPane />
      </div>
    </div>
  );
};
