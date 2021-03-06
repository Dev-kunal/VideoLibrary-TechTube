import { useNavigate, useParams } from "react-router-dom";
import "./watch.css";
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
        <div className="watch-page">
          <div className="sidebar">
            <NavPane />
          </div>
          <div className="video-side">
            <iframe
              className="video-frame"
              title={_id}
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${url}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="video-info">
              <div className="name-and-views">
                <div>
                  <h3>{name}</h3>
                  <small>{views} views</small>
                </div>
                <div className="video-actions">
                  <button
                    className="btn btn-secondary"
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
                          <i
                            className="far fa-thumbs-up"
                            style={{ color: "var(--myColor)", fontWeight: 800 }}
                          />
                        ) : (
                          <i class="far fa-thumbs-up"></i>
                        )}
                      </>
                    )}
                  </button>
                  <button
                    onClick={() =>
                      token ? showPlaylistModal() : navigate("/login")
                    }
                    className="btn btn-secondary"
                  >
                    <svg
                      className="svg-icon"
                      focusable="false"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"></path>
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
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    className="avatar-small"
                    style={{ marginLeft: "0" }}
                    src="https://yt3.ggpht.com/ytc/AAUvwnhyHW7QINneXdZPEHNEl3kUIh7giLIaRrwk4CFXeA=s88-c-k-c0x00ffffff-no-rj"
                    alt="Avatar"
                  />
                  <div>
                    <h4>Beebom</h4>
                    <small>2.17 M Subscribers</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showToast && (
            <div class="toast toast-n" ref={toast}>
              <p>{toastMessage}</p>
              <button class="btn toast-btn">X</button>
            </div>
          )}
          <div className="mobile-nav">
            <NavPane />
          </div>
        </div>
      )}
    </>
  );
};
