import { createContext, useContext, useReducer } from "react";
const AuthContext = createContext();

const login = localStorage?.getItem("user") ? true : false;
const user = localStorage?.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  login,
  user,
};

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
        login: payload.login,
        user: payload.user,
      };

    default:
      return state;
  }
};

export const useAuth = () => useContext(AuthContext);
