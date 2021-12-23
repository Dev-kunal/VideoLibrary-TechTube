import { useNavigate } from "react-router";
import { useAuth } from "../../Context/UserProvider";
import { useVideo } from "../../Context/VideoProvider";
import { NavPane } from "../NavPane/NavPane";

export const User = () => {
  const { userDispatch } = useAuth();
  const navigate = useNavigate();
  const { user } = useAuth();

  const logout = () => {
    userDispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <div className="p-8">
      <aside className="hidden lg:fixed lg:left-0 lg:top-28 lg:flex lg:flex-col lg:p-4 lg:h-2/3 lg:text-center ">
        <NavPane />
      </aside>

      <div className="lg:hidden flex justify-around bg-navbar-color text-black fixed bottom-0 left-0 z-10 w-full py-1 px-0 ">
        <NavPane />
      </div>
      <div className="shadow-lg max-w-xs my-8 mx-auto rounded-xl p-8 min-h-xs border ">
        <div className="flex justify-center items-center flex-col">
          <img
            className="h-28 w-28"
            src="https://cdn2.iconfinder.com/data/icons/flatfaces-everyday-people-square/128/beard_male_man_face_avatar-512.png"
            alt="Avatar"
          />
          <span>
            Hello <span className="text-2xl">{user.username}</span>
          </span>
          <button
            className="mt-2 text-slate-700 pt-1 pb-1 min-w-full  border border-slate-400 rounded-md hover:border-primary-color hover:text-primary-color text-sm font-semibold "
            onClick={() => navigate("/playlists")}
          >
            See your playlists
          </button>
          <button
            className="mt-2 text-slate-700 pt-1 pb-1 min-w-full border border-slate-400 rounded-md hover:border-primary-color hover:text-primary-color text-sm font-semibold "
            onClick={() => navigate("/likedvideos")}
          >
            See your liked Videos
          </button>
          <button className="mt-2 text-slate-700 pt-1 pb-1 min-w-full border border-slate-400 rounded-md hover:border-primary-color hover:text-primary-color text-sm font-semibold " onClick={() => logout()}>
            Log-out
          </button>
        </div>
      </div>
    </div>
  );
};
