import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { PlaylistModal, NavPane } from "../../Components";
import { useVideo } from "../../Context/VideoProvider";
import { UseAxios } from "../../Utils/UseAxios";
import Loader from "react-loader-spinner";
import { useAuth } from "../../Context/UserProvider";
import { likeUnlikeVideo } from "./services";

export const Watch = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const { videoId } = useParams();
  const { dispatch, showToast, toastMessage, likedVideos, playlists } =
    useVideo();
  const { token } = useAuth();
  const toast = useRef(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [likeloader, setLikeLoader] = useState(false);

  const navigate = useNavigate();
  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 1000);
  }

  const showPlaylistModal = () => {
    setModalVisibility(true);
  };

  const likeUnlike = () => {
    const body = {
      videoId,
    };
    likeUnlikeVideo({ setLikeLoader, dispatch, setVideo, body });
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { video, isLiked } = await UseAxios("GET", `/videos/${videoId}`);
        setVideo(modifyVideo(video, isLiked));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const modifyVideo = (video, isLiked) => {
    return { ...video, isLiked };
  };
  if (video) {
    var { _id, name, views, url, isLiked } = video;
  }

  return (
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
        <div className="p-4 h-full w-full">
          <aside className="hidden lg:fixed lg:left-0 lg:top-28 lg:flex lg:flex-col lg:p-4 lg:h-2/3 lg:text-center ">
            <NavPane />
          </aside>

          <div className="lg:hidden flex justify-around bg-navbar-color text-black fixed bottom-0 left-0 z-10 w-full py-1 px-0 ">
            <NavPane />
          </div>
          <div className="w-full h-4/5 lg:ml-32 lg:w-8/12">
            <iframe
              className="w-full h-full lg:w-4/5 aspect-video"
              title={_id}
              src={`https://www.youtube.com/embed/${url}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="w-full lg:w-4/5">
              <div className="flex justify-between mt-2 border-b border-slate-400 ">
                <div>
                  <h3 className="font-bold text-xl ">{name}</h3>
                  <small className="text-slate-500 font-semibold">{views} views</small>
                </div>
                <div className="flex max-h-12">
                  <button
                    className="px-3 m-1"
                    onClick={() => (token ? likeUnlike() : navigate("/login"))}
                  >
                    {likeloader && (
                      <div className="btn-container">
                        <Loader
                          type="ThreeDots"
                          color="#2bc48a"
                          height={10}
                          width={20}
                          timeout={1000}
                        />
                      </div>
                    )}
                    {!likeloader && (
                      <>
                        {isLiked ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-color" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                        )}
                      </>
                    )}
                  </button>
                  <button
                    onClick={() =>
                      token ? showPlaylistModal() : navigate("/login")
                    }
                    className="p-1 m-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {isModalVisible && (
                <PlaylistModal
                  isModalVisible={isModalVisible}
                  setModalVisibility={setModalVisibility}
                  videoId={videoId}
                />
              )}

              <div
                className="flex justify-between items-center"
              >
                <div className="flex items-center">
                  <img
                    className="w-12 h-12 md:h-16 md:w-16 rounded-full mr-2 mt-2"
                    src="https://yt3.ggpht.com/ytc/AAUvwnhyHW7QINneXdZPEHNEl3kUIh7giLIaRrwk4CFXeA=s88-c-k-c0x00ffffff-no-rj"
                    alt="Avatar"
                  />
                  <div>
                    <h4 className="font-semibold" >Beebom</h4>
                    <small>2.17 M Subscribers</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showToast && (
            <div className="flex items-baseline justify-between absolute bottom-8 right-8 border border-primary-color text-white rounded-md bg-primary-color p-2 text-sm " ref={toast}>
              <p>{toastMessage}</p>
              <button className="btn toast-btn">X</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
