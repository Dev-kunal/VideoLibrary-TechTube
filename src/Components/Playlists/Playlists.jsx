import { useVideo } from "../../Context/VideoProvider";
import { NavPane } from "../NavPane/NavPane";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { getPlaylists } from "./services";

export const Playlists = () => {
  const { playlists, dispatch } = useVideo();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPlaylists({ setLoading, dispatch });
  }, []);

  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 h-screen w-full z-10 opacity-70 flex justify-center items-center bg-zinc-700">
          <Loader
            type="RevolvingDot"
            color="#2bc48a"
            height={100}
            width={100}
            timeout={2000}
          />
        </div>
      ) : (
        <div className="md:p-4">
          <aside className="hidden lg:fixed lg:left-0 lg:top-28 lg:flex lg:flex-col lg:p-4 lg:h-2/3 lg:text-center ">
            <NavPane />
          </aside>

          <div className="lg:hidden flex justify-around bg-navbar-color text-black fixed bottom-0 left-0 z-10 w-full py-1 px-0 ">
            <NavPane />
          </div>

          <ul className="flex flex-col ml-0 justify-center items-center lg:ml-28 lg:wrap lg:flex-row lg:justify-start list-none">
            {playlists.length < 1 ? (
              <div className="border border-primary-color p-4 mx-auto my-36">You've Not created any Playlist</div>
            ) : (
              playlists.map((playlist) => (
                <li
                  key={playlist._id}
                  onClick={() => navigate(`/playlists/${playlist._id}`)}
                  className="last:pb-12 md:last:pb-0"
                >
                  <div className="mx-0 my-2 w-full lg:w-64 md:my-2 md:mx-1 text-black cursor-pointer relative hover:shadow-sm">
                    <div className="relative">
                      <img
                        src={
                          playlist.videos.length < 1
                            ? "https://d2uolguxr56s4e.cloudfront.net/img/kartrapages/video_player_placeholder.gif"
                            : playlist.videos[0].thumbnail
                        }
                        alt="thumbnail"
                        height="auto"
                        width="100%"
                      />
                      <div className="absolute top-0 right-0 h-full w-1/2 bg-zinc-800 opacity-70"></div>
                    </div>
                    <div className="top-20 flex w-8 z-10 absolute md:top-16 right-14 opacity-100 text-slate-300 hover:text-white">
                      <span>{playlist.videos.length}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="p-2 font-semibold ">{playlist.playlistName}</h4>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </>
  );
};
