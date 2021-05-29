import { useNavigate, useParams } from "react-router-dom";
import { NavPane } from "../Components/NavPane/NavPane";
import { useEffect, useState } from "react";
import { UseAxios } from "./../Utils/UseAxios";
import { baseUrl } from "./../Utils/ApiEndpoints";
import Loader from "react-loader-spinner";
import { VideoCard } from "../Components/VideoCard/VideoCard";

export const Playlist = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [itemsInPlaylist, setItemsInPlaylist] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { playlist } = await UseAxios(
          "GET",
          `${baseUrl}/playlist/${playlistId}`
        );
        console.log(playlist);
        setItemsInPlaylist(playlist.videos);
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
        <div className="playlist-page">
          <div className="sidebar">
            <NavPane />
          </div>
          <ul className="video-container">
            {itemsInPlaylist?.length < 1
              ? "You haven't add any video in this playlist"
              : itemsInPlaylist?.map((video) => (
                  <li
                    key={video._id}
                    onClick={() => navigate(`/watch/${video._id}`)}
                  >
                    <VideoCard video={video} />
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
