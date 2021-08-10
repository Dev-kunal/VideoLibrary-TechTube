import { UseAxios } from "../../Utils/UseAxios";

export const getVideos = async ({ setLoading, dispatch }) => {
  try {
    setLoading(true);
    const { videos, success, message } = await UseAxios("GET", `/data`);
    if (!success) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { message },
      });
    }
    dispatch({
      type: "SET_VIDEOS",
      payload: { videos: videos },
    });
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};
