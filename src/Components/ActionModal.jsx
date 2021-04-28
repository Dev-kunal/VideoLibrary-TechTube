import { useRef, useState } from "react";
import { useVideo } from "../Context/reducer";

export const ActionModal = ({ setModalVisibility, isModalVisible, video }) => {
  const { playlists, dispatch, showToast, toastMessage } = useVideo();
  const [newPlaylist, setNewPlaylist] = useState("");
  const toast = useRef(null);

  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 1000);
  }

  const handlePlaylistChecked = (playlistToModify, video) => {
    isInPlaylist(playlistToModify, video)
      ? dispatch({
          type: "REMOVE_FROM_PLAYLIST",
          payload: { name: playlistToModify, url: video }
        })
      : dispatch({
          type: "ADD_TO_PLAYLIST",
          payload: { name: playlistToModify, url: video }
        });
  };

  const handleCreateNewPlaylist = () => {
    if (newPlaylist.length > 0) {
      dispatch({ type: "CREATE_NEW_PLAYLIST", payload: newPlaylist });
    } else {
      alert("Cant add empty playlist");
    }
    setNewPlaylist("");
  };
  const isInPlaylist = (playlistName, vidoeUrl) => {
    const result =
      playlists.filter((listItem) =>
        listItem.name === playlistName
          ? listItem.itemsInPlaylist.includes(vidoeUrl)
            ? true
            : false
          : false
      ).length > 0
        ? true
        : false;
    return result;
  };
  return (
    <>
      <div className="modal-container"></div>
      <div class="modal">
        <button
          class="btn modal-btn"
          onClick={() => setModalVisibility(!isModalVisible)}
        >
          X
        </button>
        {playlists.map((playlist) => (
          <div className="input-box">
            <label>
              <input
                onChange={() => handlePlaylistChecked(playlist.name, video)}
                type="checkbox"
                style={{ marginRight: "0.5rem" }}
                defaultChecked={isInPlaylist(playlist.name, video)}
              />
              {playlist.name}
            </label>
          </div>
        ))}

        <input
          value={newPlaylist}
          className="input line-input"
          type="text"
          onChange={(event) => setNewPlaylist(event.target.value)}
        />
        <button className="btn btn-secondary" onClick={handleCreateNewPlaylist}>
          + Create New Playlist
        </button>
      </div>
      {showToast && (
        <div class="toast toast-n" ref={toast}>
          <p>{toastMessage}</p>
          <button class="btn toast-btn">X</button>
        </div>
      )}
    </>
  );
};
