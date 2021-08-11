import { videoReducer } from "./reducer";

describe("Testing video reducer", () => {
  test("Should set the videos", () => {
    const initialState = {
      videos: [],
    };
    const payload = {
      videos: [
        { id: 1, videoUrl: "Uj2Z4EohOvM" },
        { id: 2, videoUrl: "Uj2Z4EBjfnk" },
      ],
    };
    const setVideos = {
      type: "SET_VIDEOS",
      payload,
    };
    const finalState = {
      videos: [
        { id: 1, videoUrl: "Uj2Z4EohOvM" },
        { id: 2, videoUrl: "Uj2Z4EBjfnk" },
      ],
    };
    expect(finalState).toEqual(videoReducer(initialState, setVideos));
  });
  test("Should set the playlists", () => {
    const initialState = {
      playlists: [],
    };
    const payload = {
      playlists: [
        { id: 1, name: "My Playlist1" },
        { id: 2, name: "My Playlist2" },
      ],
    };
    const setPlaylists = {
      type: "SET_PLAYLISTS",
      payload,
    };
    const finalState = {
      playlists: [
        { id: 1, name: "My Playlist1" },
        { id: 2, name: "My Playlist2" },
      ],
    };
    expect(finalState).toEqual(videoReducer(initialState, setPlaylists));
  });
  test("Should set the likedVideos", () => {
    const initialState = {
      likedVideos: [],
    };
    const payload = {
      likedVideos: [{ id: 1, name: "ywotbosdup" }],
    };
    const setLikedVideos = {
      type: "SET_LIKED_VIDEOS",
      payload,
    };
    const finalState = {
      likedVideos: [{ id: 1, name: "ywotbosdup" }],
    };
    expect(finalState).toEqual(videoReducer(initialState, setLikedVideos));
  });
  test("Should add new Playlist", () => {
    const initialState = {
      playlists: [{ id: 1, name: "My Playlist1" }],
    };
    const payload = {
      newPlaylist: { id: 2, name: "My Playlist2" },
    };
    const addNewPlaylist = {
      type: "ADD_NEW_PLAYLIST",
      payload,
    };
    const finalState = {
      playlists: [
        { id: 1, name: "My Playlist1" },
        { id: 2, name: "My Playlist2" },
      ],
    };
    expect(finalState).toEqual(videoReducer(initialState, addNewPlaylist));
  });

  test("Should delete playlist", () => {
    const initialState = {
      showToast: false,
      toastMessage: "",
      playlists: [
        { _id: 1, name: "My Playlist1" },
        { _id: 2, name: "My Playlist2" },
      ],
    };
    const payload = {
      playlistId: 1,
    };
    const deletePlaylist = {
      type: "DELETE_PLAYLIST",
      payload,
    };
    const finalState = {
      showToast: true,
      toastMessage: "Playlist Deleted Successfully",
      playlists: [{ _id: 2, name: "My Playlist2" }],
    };
    expect(finalState).toEqual(videoReducer(initialState, deletePlaylist));
  });
  test("Should add item to playlist", () => {
    const initialState = {
      showToast: false,
      toastMessage: "",
      playlists: [
        { _id: 1, name: "My Playlist1", videos: ["rlem", "rers"] },
        { _id: 2, name: "My Playlist2", videos: ["fsfs"] },
      ],
    };
    const payload = {
      savedPlaylist: {
        _id: 2,
        name: "My Playlist2",
        videos: ["fsfs", "rfern"],
      },
    };
    const addToPlaylist = {
      type: "ADD_TO_PLAYLIST",
      payload,
    };
    const finalState = {
      showToast: true,
      toastMessage: "Video Added to Playlist",
      playlists: [
        { _id: 1, name: "My Playlist1", videos: ["rlem", "rers"] },
        { _id: 2, name: "My Playlist2", videos: ["fsfs", "rfern"] },
      ],
    };
    expect(finalState).toEqual(videoReducer(initialState, addToPlaylist));
  });
});
