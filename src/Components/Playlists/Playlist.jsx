import { useNavigate, useParams } from "react-router-dom";
import { NavPane } from "../NavPane/NavPane";
import { useEffect, useState, useRef } from "react";
import Loader from "react-loader-spinner";
import { VideoCard } from "../VideoCard/VideoCard";
import { useVideo } from "../../Context/VideoProvider";
import { deleteAPlaylist, getAPlaylist } from "./services";

export const Playlist = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [itemsInPlaylist, setItemsInPlaylist] = useState(null);
  const { dispatch, showToast, toastMessage } = useVideo();
  const toast = useRef(null);
  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 2000);
  }
  useEffect(() => {
    getAPlaylist({ setLoading, setItemsInPlaylist, playlistId });
  }, []);

  const deletePlaylist = async () => {
    const body = {
      playlistId,
    };
    const res = await deleteAPlaylist({ dispatch, setLoading, body });
    if (res) {
      navigate("/playlists");
    }
  };

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
          <div className="delete-btn-div">
            <button
              className="btn-delete btn btn-secondary user-action-btn"
              title="Delete Playlist"
              onClick={() => deletePlaylist()}
            >
              <i className="fas fa-trash"></i> Delete Playlist
            </button>
          </div>
          <div className="sidebar">
            <NavPane />
          </div>
          <ul className="video-container">
            {itemsInPlaylist?.length < 1 ? (
              <div className="mesg">
                You've Not added any video to this playlist
              </div>
            ) : (
              itemsInPlaylist?.map((video) => (
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
      {showToast && (
        <div className="toast toast-n" ref={toast}>
          <p>{toastMessage}</p>
          <button className="btn toast-btn">X</button>
        </div>
      )}
    </>
  );
};
