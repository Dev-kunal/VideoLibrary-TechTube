import { useRef, useState, useEffect } from "react";
import { useVideo } from "../Context/VideoProvider";
import { UseAxios } from "../Utils/UseAxios.js";
import { baseUrl } from "../Utils/ApiEndpoints";
import { useAuth } from "../Context/UserProvider";
import Loader from "react-loader-spinner";

export const PlaylistModal = ({
  setModalVisibility,
  isModalVisible,
  videoId,
}) => {
  const { playlists, dispatch, showToast, toastMessage } = useVideo();
  const [newPlaylist, setNewPlaylist] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const { user } = useAuth();

  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 1000);
  }
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { playlists } = await UseAxios("GET", `${baseUrl}/playlist`);
        dispatch({
          type: "SET_PLAYLISTS",
          payload: { playlists },
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const addOrRemoveFromPlaylist = (playlistId, videoId, videos) => {
    const obj = {
      userId: user._id,
      playlistId,
      videoId,
    };
    isInPlaylist(videos, videoId)
      ? (async () => {
          try {
            setLoading(true);
            const response = await UseAxios(
              "POST",
              `${baseUrl}/playlist/removeitem`,
              obj
            );

            if (response.success) {
              dispatch({
                type: "REMOVE_FROM_PLAYLIST",
                payload: { playlistId, videoId },
              });
            }
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        })()
      : (async () => {
          try {
            setLoading(true);
            const {
              success,
              savedPlaylist: { videos },
            } = await UseAxios("POST", `${baseUrl}/playlist/additem`, obj);

            if (success) {
              dispatch({
                type: "ADD_TO_PLAYLIST",
                payload: { playlistId, videoId },
              });
            }
            setLoading(false);
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        })();
  };

  const CreateNewPlaylist = () => {
    if (newPlaylist.length > 0) {
      const obj = {
        playlistName: newPlaylist,
        userId: user._id,
      };
      (async () => {
        try {
          setLoading(true);
          const { savedPlaylist } = await UseAxios(
            "POST",
            `${baseUrl}/playlist`,
            obj
          );

          dispatch({
            type: "ADD_NEW_PLAYLIST",
            payload: { newPlaylist: savedPlaylist },
          });
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      alert("Please specify a name for playlist");
    }
    setNewPlaylist("");
  };

  const isInPlaylist = (videos, videoId) => {
    return videos.filter((video) => video._id === videoId || video === videoId)
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
            <button className="btn btn-secondary" onClick={CreateNewPlaylist}>
              + Create New Playlist
            </button>
          </div>
        )}
      </>

      {showToast && (
        <div className="toast toast-n" ref={toast}>
          <p>{toastMessage}</p>
          <button className="btn toast-btn">X</button>
        </div>
      )}
    </>
  );
};
