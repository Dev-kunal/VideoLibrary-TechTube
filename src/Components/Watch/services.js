import { UseAxios } from "../../Utils/UseAxios";

export const likeUnlikeVideo = async ({
  setLikeLoader,
  dispatch,
  setVideo,
  body,
}) => {
  try {
    setLikeLoader(true);
    const { liked } = await UseAxios("POST", `/videos/likeunlike`, body);
    if (liked) {
      setVideo((video) => {
        return {
          ...video,
          isLiked: true,
        };
      });
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: "Added to liked videos" },
      });
    } else {
      setVideo((video) => {
        return {
          ...video,
          isLiked: false,
        };
      });
      dispatch({
        type: "SHOW_TOAST",
        payload: { message: "Removed from liked videos" },
      });
    }
    setLikeLoader(false);
  } catch (error) {
    console.log(error);
  }
};
