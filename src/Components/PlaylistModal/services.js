import { UseAxios } from "../../Utils/UseAxios";

export const removeFromPlaylist = async ({ setLoading, dispatch, body }) => {
  try {
    setLoading(true);
    const { success, savedPlaylist, message } = await UseAxios(
      "POST",
      `/playlist/removeitem`,
      body
    );
    if (!success) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message },
      });
    }
    dispatch({
      type: "REMOVE_FROM_PLAYLIST",
      payload: { savedPlaylist },
    });
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

export const addToPlaylist = async ({
  dispatch,
  setLoading,
  setModalVisibility,
  body,
}) => {
  try {
    setLoading(true);
    const { success, savedPlaylist, message } = await UseAxios(
      "POST",
      `/playlist/additem`,
      body
    );
    setLoading(false);
    if (!success) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message },
      });
    }
    dispatch({
      type: "ADD_TO_PLAYLIST",
      payload: { savedPlaylist },
    });
    setModalVisibility((visibility) => !visibility);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

export const createNewPlaylist = async ({ setLoading, body, dispatch }) => {
  try {
    setLoading(true);
    const { savedPlaylist } = await UseAxios("POST", `/playlist`, body);
    dispatch({
      type: "ADD_NEW_PLAYLIST",
      payload: { newPlaylist: savedPlaylist },
    });
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};
