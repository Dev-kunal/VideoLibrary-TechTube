import { useNavigate } from "react-router-dom";
import { useVideo } from "../../Context/VideoProvider";
import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";

import { NavPane, VideoCard } from "..";
import { getLikedVideos } from "./services";

export const LikedVideos = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { likedVideos, dispatch } = useVideo();

  useEffect(() => {
    getLikedVideos({ setLoading, dispatch });
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
            timeout={3000}
          />
        </div>
      ) : (
        <div className="p-4">
          <aside className="hidden lg:fixed lg:left-0 lg:top-28 lg:flex lg:flex-col lg:p-4 lg:h-2/3 lg:text-center">
            <NavPane />
          </aside>

          <div className="lg:hidden flex justify-around bg-navbar-color text-black fixed bottom-0 left-0 z-10 w-full py-1 px-0">
            <NavPane />
          </div>
          <ul className="list-none ml-0 mb-8 justify-center items-center md:flex md:ml-28 md:flex-wrap md:justify-start">
            {likedVideos.length < 1 ? (
              <div className="mesg">You've not like a video yet</div>
            ) : (
              likedVideos.map((video) => (
                <li
                  className="last:pb-1 md:last:pb-0"
                  key={video._id}
                  onClick={() => navigate(`/watch/${video._id}`)}
                >
                  <VideoCard video={video} />
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </>
  );
};
