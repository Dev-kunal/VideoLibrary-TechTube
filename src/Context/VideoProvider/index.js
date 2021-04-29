import { createContext, useContext, useReducer } from "react";
import { videoReducer, initialState } from "./reducer";

const VideoContext = createContext();
export const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);

  return (
    <VideoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  return useContext(VideoContext);
};
