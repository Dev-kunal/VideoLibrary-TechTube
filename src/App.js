import { HomePage } from "./Components";
import { Navbar } from "./Components";
import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { Playlists } from "./Components";
import { User } from "./Components";
import { Watch } from "./Components";
import { Playlist } from "./Components/Playlist";
import { LikedVideos } from "./Components/LikedVideos";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/user" element={<User />} />
        <Route path="/playlists/:playlistId" element={<Playlist />} />
        <Route path="/watch/:videoId" element={<Watch />} />
        <Route path="/likedvideos" element={<LikedVideos />} />
      </Routes>
    </div>
  );
}
