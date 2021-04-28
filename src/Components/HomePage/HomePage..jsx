import { VideoCard } from "../VideoCard/VideoCard";
import "./homepage.css";

import { videos } from "../../Data";
import { useNavigate, NavLink } from "react-router-dom";
import { NavPane } from "../NavPane/NavPane";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
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
              <li key={video.id} onClick={() => navigate(`/watch/${video.id}`)}>
                <VideoCard video={video} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
