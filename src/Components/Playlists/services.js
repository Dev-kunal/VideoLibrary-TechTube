import { UseAxios } from "../../Utils/UseAxios";

export const getPlaylists = async ({ setLoading, dispatch }) => {
  try {
    setLoading(true);
    const { playlists, message, success } = await UseAxios("GET", `/playlist`);
    setLoading(false);
    if (!success) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message },
      });
    }
    dispatch({
      type: "SET_PLAYLISTS",
      payload: { playlists },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAPlaylist = async ({
  setLoading,
  setItemsInPlaylist,
  playlistId,
  setName
}) => {
  try {
    setLoading(true);
    const { playlist } = await UseAxios("GET", `/playlist/${playlistId}`);
    setName(playlist.playlistName)
    setItemsInPlaylist(playlist.videos);
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

export const deleteAPlaylist = async ({ setLoading, dispatch, body }) => {
  try {
    setLoading(true);
    const { success, message } = await UseAxios(
      "POST",
      `/playlist/delete`,
      body
    );
    if (!success) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: message },
      });
      return success;
    }
    dispatch({
      type: "DELETE_PLAYLIST",
      payload: { playlistId: body.playlistId },
    });
    return success;
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};
