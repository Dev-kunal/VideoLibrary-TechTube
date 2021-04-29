import { NavPane } from "../Components/NavPane/NavPane";
import { useNavigate } from "react-router-dom";
import { useVideo } from "../Context/VideoProvider";

export const LikedVideos = () => {
  const { likedVideos, videos } = useVideo();
  const navigate = useNavigate();

  const getVideo = (videoUrl) => {
    const video = videos.find((video) => video.url === videoUrl);
    return video;
  };
  return (
    <div className="liked-videos-page" style={{ padding: "1rem" }}>
      <div className="video-container">
        <div className="sidebar">
          <NavPane />
        </div>
        <ul className="list">
          {likedVideos.map(({ videoUrl }) => (
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
                  <span className="small">
                    {getVideo(videoUrl).views} views
                  </span>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
      <div className="mobile-nav">
        <NavPane />
      </div>
    </div>
  );
};
