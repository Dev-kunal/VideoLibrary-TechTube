import { UseAxios } from "../../Utils/UseAxios";

export const getLikedVideos = async ({ setLoading, dispatch }) => {
  try {
    setLoading(true);
    const { likedVideos } = await UseAxios("GET", `/videos/liked`);
    dispatch({
      type: "SET_LIKED_VIDEOS",
      payload: { likedVideos: likedVideos.map((video) => video.videoId) },
    });
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};
