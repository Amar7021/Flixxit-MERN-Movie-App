import { NavLink } from "react-router-dom";
import "./dropDownPage.scss";

const DropDownPage = () => {
  return (
    <div className="dropDownPage">
      <ul>
        <NavLink to="/" className="link">
          <li>Home</li>
        </NavLink>
        <NavLink to="/tv" className="link">
          <li>TV Shows</li>
        </NavLink>
        <NavLink to="/movies" className="link">
          <li>Movies</li>
        </NavLink>
        <NavLink to="/mylist" className="link">
          <li>My List</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default DropDownPage;
