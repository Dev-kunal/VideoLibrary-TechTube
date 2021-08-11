import "./styles.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "./Context/UserProvider";
import { useEffect } from "react";
import {
  setupAuthHeaderForServiceCalls,
  setupAuthExceptionHandler,
} from "./Utils/UseAxios";
import {
  HomePage,
  Navbar,
  Playlists,
  User,
  Watch,
  Playlist,
  LikedVideos,
  Login,
  Signup,
} from "./Components";
import { PrivateRoute } from "./Utils/PrivateRoute";

export default function App() {
  const { token, userDispatch } = useAuth();
  const navigate = useNavigate();

  const logOutUser = () => {
    localStorage.removeItem("session");
    userDispatch({
      type: "SET_LOGIN",
      token: null,
      user: null,
    });
  };

  useEffect(() => {
    if (token) {
      setupAuthHeaderForServiceCalls(token);
      setupAuthExceptionHandler(logOutUser, navigate);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/watch/:videoId" element={<Watch />} />
        <PrivateRoute path="/playlists" element={<Playlists />} />
        <PrivateRoute path="/user" element={<User />} />
        <PrivateRoute path="/playlists/:playlistId" element={<Playlist />} />
        <PrivateRoute path="/likedvideos" element={<LikedVideos />} />
      </Routes>
    </div>
  );
}
