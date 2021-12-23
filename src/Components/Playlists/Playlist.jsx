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
              <i className="fas fa-trash"></i> Delete Playlist
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
        <div className="toast toast-n" ref={toast}>
          <p>{toastMessage}</p>
          <button className="btn toast-btn">X</button>
        </div>
      )}
    </>
  );
};
