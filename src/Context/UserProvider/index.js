import { createContext, useContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  setupAuthExceptionHandler,
  setupAuthHeaderForServiceCalls,
} from "../../Utils/UseAxios";
const dataFromlLocalStorage = JSON.parse(localStorage.getItem("session"));
const token = dataFromlLocalStorage ? dataFromlLocalStorage.token : null;
const user = dataFromlLocalStorage ? dataFromlLocalStorage.user : null;
const initialState = {
  token,
  user,
};

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [state, userDispatch] = useReducer(userReducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, userDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_LOGIN":
      return {
        ...state,
        token: payload.token,
        user: payload.user,
      };

    default:
      return state;
  }
};

export const useAuth = () => useContext(AuthContext);
