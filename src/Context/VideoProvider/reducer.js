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
    case "DELETE_PLAYLIST":
      return {
        ...state,
        showToast: true,
        toastMessage: "Playlist Deleted Successfully",
        playlists: state.playlists.filter(
          (item) => item._id != payload.playlistId
        ),
      };
    // case "ADD_TO_PLAYLIST":
    //   return {
    //     ...state,
    //     showToast: true,
    //     toastMessage: `Video Added to Playlist`,
    //     playlists: state.playlists.map((playlist) =>
    //       playlist._id === payload.playlistId
    //         ? {
    //             ...playlist,
    //             videos: playlist.videos.concat(payload.videoId),
    //           }
    //         : playlist
    //     ),
    //   };
    case "ADD_TO_PLAYLIST":
      return {
        ...state,
        showToast: true,
        toastMessage: `Video Added to Playlist`,
        playlists: state.playlists.map((playlist) =>
          playlist._id === payload.savedPlaylist._id
            ? payload.savedPlaylist
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
          playlist._id === payload.savedPlaylist._id
            ? payload.savedPlaylist
            : playlist
        ),
      };
    // case "REMOVE_FROM_PLAYLIST":
    //   console.log("remove from playlist", payload.videoId);
    //   return {
    //     ...state,
    //     showToast: true,
    //     toastMessage: `Video Removed from Playlist`,
    //     playlists: state.playlists.map((playlist) =>
    //       playlist._id === payload.playlistId
    //         ? {
    //             ...playlist,
    //             videos: playlist.videos.filter(
    //               (video) => video._id != payload.videoId
    //             ),
    //           }
    //         : playlist
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
