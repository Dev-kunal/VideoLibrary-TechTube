import { NavLink } from "react-router-dom";

export const NavPane = () => {
  return (
    <>
      <NavLink end to="/" className="sidebar-btn" active="true">
        <i className="fa fa-home" aria-hidden="true" />
        <br />
        Home
      </NavLink>
      <NavLink to="/playlists" className="sidebar-btn" active="true">
        <svg
          className="svg-icon"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"></path>
        </svg>
        <br />
        Playlists
      </NavLink>
      <NavLink to="/likedvideos" className="sidebar-btn" active="true">
        <svg
          className="svg-icon"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15z"></path>
        </svg>
        <br />
        Liked
      </NavLink>
    </>
  );
};
