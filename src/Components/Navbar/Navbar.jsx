
import "./navbar.css";
import { Link, } from "react-router-dom";
import { useAuth } from "../../Context/UserProvider";

export const Navbar = () => {
  const { token } = useAuth();

  return (
    <div className="flex items-center justify-between bg-navbar-color px-4 py-3 sticky top-0 left-0 z-10 shadow-sm shadow-slate-300">
      <div className="flex items-center font-bold">
        <img
          className="w-8 h-8 mx-2 "
          src="/Images/technology-products.svg"
          alt="brand"
        />
        <Link className="no-underline text-black" to="/">
          Tech<span className="text-primary-color">Tube</span>
        </Link>
      </div>
      <div className={token ? "flex items-center justify-center" : "flex align-baseline justify-center"}>
        <div>
          {token ? (
            <Link to="/user">
              <img
                className="w-8 h-8 rounded-full"
                src="https://cdn2.iconfinder.com/data/icons/flatfaces-everyday-people-square/128/beard_male_man_face_avatar-512.png"
                alt="Avatar"
              />
            </Link>
          ) : (
            <Link to="/login" className="px-2 py-1 text-sm hover:bg-primary-color rounded-sm hover:text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
