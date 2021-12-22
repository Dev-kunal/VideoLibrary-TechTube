import { useRef, useState, useEffect } from "react";
import { useVideo } from "../../Context/VideoProvider";
import Loader from "react-loader-spinner";
import {
  addToPlaylist,
  createNewPlaylist,
  removeFromPlaylist,
} from "./services";
import { getPlaylists } from "../Playlists/services";

export const PlaylistModal = ({
  setModalVisibility,
  isModalVisible,
  videoId,
}) => {
  const { playlists, dispatch, showToast, toastMessage } = useVideo();
  const [newPlaylist, setNewPlaylist] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 2000);
  }
  useEffect(() => {
    getPlaylists({ dispatch, setLoading });
  }, []);

  const addOrRemoveFromPlaylist = (playlistId, videoId, videos) => {
    const body = {
      playlistId,
      videoId,
    };
    isInPlaylist(videos, videoId)
      ? removeFromPlaylist({ dispatch, setLoading, body })
      : addToPlaylist({ dispatch, setLoading, setModalVisibility, body });
  };

  const createPlaylist = () => {
    if (newPlaylist.length > 0) {
      const body = {
        playlistName: newPlaylist,
      };
      createNewPlaylist({ body, dispatch, setLoading });
    } else {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: "Please Add a name for Playlist" },
      });
    }
    setNewPlaylist("");
  };

  const isInPlaylist = (videos, videoId) => {
    return videos.filter((video) => video === videoId || video._id === videoId)
      .length;
  };

  return (
    <>
      <div className="modal-container"></div>
      <>
        {loading ? (
          <div className="loader-container">
            <Loader
              type="RevolvingDot"
              color="#2bc48a"
              height={100}
              width={100}
              timeout={1000}
            />
          </div>
        ) : (
          <div className="modal">
            <button
              className="btn modal-btn"
              onClick={() => setModalVisibility(!isModalVisible)}
            >
              X
            </button>
            {playlists.map(({ _id, playlistName, videos }) => (
              <div className="input-box" key={_id}>
                <label>
                  <input
                    onChange={() =>
                      addOrRemoveFromPlaylist(_id, videoId, videos)
                    }
                    type="checkbox"
                    style={{ marginRight: "0.5rem" }}
                    defaultChecked={isInPlaylist(videos, videoId)}
                  />
                  {playlistName}
                </label>
              </div>
            ))}
            <input
              value={newPlaylist}
              className="input line-input"
              type="text"
              placeholder="PlaylistName"
              onChange={(event) => setNewPlaylist(event.target.value)}
            />
            <button className="btn btn-secondary" onClick={createPlaylist}>
              + Create New Playlist
            </button>
          </div>
        )}
      </>
      {showToast && (
        <div class="toast toast-n" ref={toast}>
          <p>{toastMessage}</p>
          <button class="btn toast-btn">X</button>
        </div>
      )}
    </>
  );
};
