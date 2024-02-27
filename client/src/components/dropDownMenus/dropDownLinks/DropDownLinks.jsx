import { NavLink } from "react-router-dom"
import "./dropDownLinks.scss"

const DropDownLinks = () => {
  return (
    <div className="dropDownLinks">
      <ul>
        <NavLink
          to="/"
          className="link"
        >
          <li>Home</li>
        </NavLink>
        <NavLink
          to="/tv"
          className="link"
        >
          <li>TV Shows</li>
        </NavLink>
        <NavLink
          to="/movies"
          className="link"
        >
          <li>Movies</li>
        </NavLink>
        <NavLink
          to="/mylist"
          className="link"
        >
          <li>My List</li>
        </NavLink>
      </ul>
    </div>
  )
}

export default DropDownLinks
