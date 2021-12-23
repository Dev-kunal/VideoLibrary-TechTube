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
  const [name, setName] = useState("");
  const { dispatch, showToast, toastMessage } = useVideo();
  const toast = useRef(null);
  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 2000);
  }
  useEffect(() => {
    getAPlaylist({ setLoading, setItemsInPlaylist, playlistId, setName });
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
        <div className="fixed top-0 left-0 h-screen w-full z-10 opacity-70 flex justify-center items-center bg-zinc-700">
          <Loader
            type="RevolvingDot"
            color="#2bc48a"
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      ) : (
        <div className="p-4">
          <div className="text-right p-1">
            <button
              className="text-sm p-1 m-1 w-40 border border-slate-300 rounded-md hover:border-red-500 "
              title="Delete Playlist"
              onClick={() => deletePlaylist()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg> Delete Playlist
            </button>
          </div>
          <aside className="hidden lg:fixed lg:left-0 lg:top-28 lg:flex lg:flex-col lg:p-4 lg:h-2/3 lg:text-center ">
            <NavPane />
          </aside>

          <div className="lg:hidden flex justify-around bg-navbar-color text-black fixed bottom-0 left-0 z-10 w-full py-1 px-0 ">
            <NavPane />
          </div>
          <ul className="list-none ml-0 mb-8 justify-center items-center md:flex md:ml-28 md:flex-wrap md:justify-start ">
            {itemsInPlaylist?.length < 1 ? (
              <div className="mesg">
                You've Not added any video to this playlist
              </div>
            ) : (
              itemsInPlaylist?.map((video) => (
                <li
                  className="last:pb-1 md:last:pb-0"
                  key={video._id}
                  onClick={() => navigate(`/watch/${video._id}`)}
                >
                  <VideoCard video={video} />
                </li>
              ))
            )}
          </ul>
        </div>
      )}
      {showToast && (
        <div className="flex items-baseline justify-between absolute bottom-8 right-8 border border-primary-color text-white rounded-md bg-primary-color p-2 text-sm " ref={toast}>
          <p>{toastMessage}</p>
          <button className="btn toast-btn">X</button>
        </div>
      )}
    </>
  );
};
