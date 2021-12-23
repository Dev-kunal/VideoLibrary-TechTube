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
      <div className=" fixed top-0 left-0 h-screen w-full z-10 bg-zinc-700 opacity-50 flex justify-center items-center"></div>
      <>
        {loading ? (
          <div className="fixed top-0 left-0 h-screen w-full z-10 opacity-70 flex justify-center items-center bg-zinc-700">
            <Loader
              type="RevolvingDot"
              color="#2bc48a"
              height={100}
              width={100}
              timeout={1000}
            />
          </div>
        ) : (
          <div className="w-80 min-w-min absolute left-2/4 top-2/4 z-10 opacity-100 text-black flex flex-col -translate-x-1/2 -translate-y-1/2 bg-bg-color p-4 rounded-md">
            <button
              className="bg-transparent border-none absolute right-3 top-3 text-sm text-zinc-600 "
              onClick={() => setModalVisibility(!isModalVisible)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            {playlists.map(({ _id, playlistName, videos }) => (
              <div className="flex justify-start items-baseline px-1" key={_id}>
                <label>
                  <input
                    onChange={() =>
                      addOrRemoveFromPlaylist(_id, videoId, videos)
                    }

                    type="checkbox"
                    className="mr-4 accent-primary-color "
                    defaultChecked={isInPlaylist(videos, videoId)}
                  />
                  {playlistName}
                </label>
              </div>
            ))}
            <input
              value={newPlaylist}
              className="my-2 bg-transparent border-b border-slate-500 outline-none"
              type="text"
              placeholder="Playlist Name"
              onChange={(event) => setNewPlaylist(event.target.value)}
            />
            <button className="mt-2 text-slate-700 pt-1 pb-1 w-full border border-slate-600 rounded-md hover:border-primary-color hover:text-primary-color text-sm font-semibold " onClick={createPlaylist}>
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
