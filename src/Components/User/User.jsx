import { NavPane } from "../NavPane/NavPane";
import "./user.css";
export const User = () => {
  return (
    <div className="user-page">
      <div className="sidebar">
        <NavPane />
      </div>
      <div className="user-container">
        <h3>
          This is user page
          <ul>
            <li>Edit Acoount Settings</li>
          </ul>
        </h3>
      </div>
      <div className="mobile-nav">
        <NavPane />
      </div>
    </div>
  );
};
