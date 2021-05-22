// import { videos } from "../../Data";

let idCount = 1;
const videos = [];
const playlists = [];

const likedVideos = [{ id: idCount++, videoUrl: "Uj2Z4EohOvM" }];
const watchLater = [];
export const initialState = {
  videos,
  playlists,
  watchLater,
  likedVideos,
  showToast: false,
  toastMessage: "",
};

export const videoReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGOUT":
      return {
        ...initialState,
      };
    case "SET_VIDEOS":
      return {
        ...state,
        videos: payload.videos,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: payload.playlists,
      };
    case "SET_LIKED_VIDEOS":
      return {
        ...state,
        likedVideos: payload.likedVideos,
      };
    case "ADD_NEW_PLAYLIST":
      return {
        ...state,
        playlists: [...state.playlists, payload.newPlaylist],
      };
    case "ADD_TO_PLAYLIST":
      console.log("add to playlist ", payload.videoId);
      return {
        ...state,
        showToast: true,
        toastMessage: `Video Added to Playlist`,
        playlists: state.playlists.map((playlist) =>
          playlist._id === payload.playlistId
            ? {
                ...playlist,
                videos: [...playlist.videos, payload.videoId],
              }
            : playlist
        ),
      };
    case "REMOVE_FROM_PLAYLIST":
      console.log("remove from playlist", payload.videoId);
      return {
        ...state,
        showToast: true,
        toastMessage: `Video Removed from Playlist`,
        playlists: state.playlists.map((playlist) =>
          playlist._id === payload.playlistId
            ? {
                ...playlist,
                videos: playlist.videos.filter(
                  (video) => video._id != payload.videoId
                ),
              }
            : playlist
        ),
      };
    // case "ADD_TO_LIKE_VIDEOS":
    //   return {
    //     ...state,
    //     showToast: true,
    //     toastMessage: "Video Added to Liked Videos",
    //     likedVideos: [
    //       ...state.likedVideos,
    //       { id: idCount++, videoUrl: payload.video },
    //     ],
    //   };

    // case "REMOVE_FROM_LIKE_VIDEOS":
    //   return {
    //     ...state,
    //     showToast: true,
    //     toastMessage: "Video removed from Liked Videos",
    //     likedVideos: state.likedVideos.filter(
    //       (video) => video.videoUrl !== payload.video
    //     ),
    //   };
    case "SHOW_TOAST":
      return {
        ...state,
        showToast: true,
        toastMessage: payload.message,
      };
    case "HIDE_TOAST":
      return {
        ...state,
        showToast: false,
      };
    default:
      return state;
  }
};
