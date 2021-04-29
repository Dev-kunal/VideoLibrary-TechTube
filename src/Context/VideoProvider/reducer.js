import { videos } from "../../Data";

let idCount = 1;
const playlists = [
  { id: idCount++, name: "Playlist1", itemsInPlaylist: ["n4uxh5jq-1c"] },
  { id: idCount++, name: "Playlist2", itemsInPlaylist: ["Uj2Z4EohOvM"] },
];
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

export const videoReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_NEW_PLAYLIST":
      return {
        ...state,
        playlists: [
          ...state.playlists,
          { id: idCount++, name: action.payload, itemsInPlaylist: [] },
        ],
      };
    case "ADD_TO_PLAYLIST":
      return {
        ...state,
        showToast: true,
        toastMessage: `Video Added to Playlist ${action.payload.name}`,
        playlists: state.playlists.map((item) =>
          item.name === action.payload.name
            ? {
                ...item,
                itemsInPlaylist: item.itemsInPlaylist.concat(
                  action.payload.url
                ),
              }
            : item
        ),
      };
    case "REMOVE_FROM_PLAYLIST":
      return {
        ...state,
        showToast: true,
        toastMessage: `Video Removed from Playlist ${action.payload.name}`,
        playlists: state.playlists.map((item) =>
          item.name === action.payload.name
            ? {
                ...item,
                itemsInPlaylist: item.itemsInPlaylist.filter(
                  (video) => video !== action.payload.url
                ),
              }
            : item
        ),
      };
    case "ADD_TO_LIKE_VIDEOS":
      return {
        ...state,
        showToast: true,
        toastMessage: "Video Added to Liked Videos",
        likedVideos: [
          ...state.likedVideos,
          { id: idCount++, videoUrl: action.payload.video },
        ],
      };

    case "REMOVE_FROM_LIKE_VIDEOS":
      return {
        ...state,
        showToast: true,
        toastMessage: "Video removed from Liked Videos",
        likedVideos: state.likedVideos.filter(
          (video) => video.videoUrl !== action.payload.video
        ),
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
