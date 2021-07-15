import { useNavigate, useParams } from "react-router-dom";
import { NavPane } from "../Components/NavPane/NavPane";
import { useEffect, useState, useRef } from "react";
import { UseAxios } from "./../Utils/UseAxios";

import Loader from "react-loader-spinner";
import { VideoCard } from "../Components/VideoCard/VideoCard";
import { useVideo } from "../Context/VideoProvider";

export const Playlist = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [itemsInPlaylist, setItemsInPlaylist] = useState(null);
  const { playlists, dispatch, showToast, toastMessage } = useVideo();
  const toast = useRef(null);
  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 2000);
  }
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { playlist } = await UseAxios("GET", `/playlist/${playlistId}`);

        setItemsInPlaylist(playlist.videos);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const deletePlaylist = () => {
    (async () => {
      try {
        setLoading(true);
        const { deletedPlaylist, success, message } = await UseAxios(
          "POST",
          `/playlist/delete`,
          {
            playlistId,
          }
        );
        if (!success) {
          dispatch({
            type: "SHOW_TOAST",
            payload: { message: message },
          });
        }

        dispatch({
          type: "DELETE_PLAYLIST",
          payload: { playlistId },
        });
        navigate("/playlists");

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
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
          <div className="delete-btn">
            <button className="btn-secondary" onClick={() => deletePlaylist()}>
              <i class="far fa-trash-alt"></i>
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
        <div class="toast toast-n" ref={toast}>
          <p>{toastMessage}</p>
          <button class="btn toast-btn">X</button>
        </div>
      )}
    </>
  );
};
