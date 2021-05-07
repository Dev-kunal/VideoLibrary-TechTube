import { useParams } from "react-router-dom";
import "./watch.css";
import { useRef } from "react";
import { videos } from "../../Data";
import { useState } from "react";
import { PlaylistModal } from "../PlaylistModal ";
import { NavPane } from "../NavPane/NavPane";
import { useVideo } from "../../Context/VideoProvider";

export const Watch = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const { videoId } = useParams();
  const { likedVideos, dispatch, showToast, toastMessage } = useVideo();
  const toast = useRef(null);

  if (showToast) {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 1000);
  }

  const { name, url, views } = videos.find(
    (video) => video.id === parseInt(videoId, 10)
  );
  const showPlaylistModal = () => {
    setModalVisibility(true);
  };
  const isLiked = () => {
    return likedVideos.find((video) => video.videoUrl === url) ? true : false;
  };

  const likeVideo = () => {
    if (isLiked()) {
      dispatch({ type: "REMOVE_FROM_LIKE_VIDEOS", payload: { video: url } });
    } else {
      dispatch({ type: "ADD_TO_LIKE_VIDEOS", payload: { video: url } });
    }
  };

  return (
    <div className="watch-page">
      <div className="sidebar">
        <NavPane />
      </div>
      <div className="video-side">
        <iframe
          className="video-frame"
          title={videoId}
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
              <button className="video-action-btn" onClick={likeVideo}>
                {isLiked() ? (
                  <i
                    className="far fa-thumbs-up"
                    style={{ color: "var(--myColor)", fontWeight: 800 }}
                  />
                ) : (
                  <i className="far fa-thumbs-up" />
                )}
              </button>
              <button onClick={showPlaylistModal} className="video-action-btn">
                <svg
                  class="svg-icon"
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
              video={url}
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
            <button className="btn">Subscribe</button>
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
  );
};
