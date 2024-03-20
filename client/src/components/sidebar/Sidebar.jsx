import {
  Close,
  FavoriteBorder,
  Home,
  LiveTv,
  Logout,
  Notifications,
  Search,
  Settings,
  Slideshow,
} from "@mui/icons-material"
import { NavLink } from "react-router-dom"
import { useEffect, useRef } from "react"
import "./sidebar.scss"

const Sidebar = ({ onClose, currentUser, handleLogout, openMenu }) => {
  const menuRef = useRef(null)

  const handleOutsideClick = (ref, stateSetter) => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        stateSetter(false)
      }
    }

    document.addEventListener("mousedown", handleClick)
    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }

  useEffect(() => {
    handleOutsideClick(menuRef, onClose)
    document.body.style.overflow = openMenu ? "hidden" : "auto"

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [menuRef, openMenu, onClose])

  return (
    <div className={`sidebar-container ${openMenu ? "visible" : ""}`}>
      <ul
        className="sidebar-wrapper"
        ref={menuRef}
      >
        <NavLink
          to="/"
          className="sidebar-link"
          onClick={onClose}
        >
          <li className="sidebar-item">
            <Home />
            <span>Home</span>
          </li>
        </NavLink>
        <NavLink
          to="/explore/movie"
          className="sidebar-link"
          onClick={onClose}
        >
          <li className="sidebar-item">
            <Slideshow />
            <span>Movies</span>
          </li>
        </NavLink>
        <NavLink
          to="/explore/tv"
          className="sidebar-link"
          onClick={onClose}
        >
          <li className="sidebar-item">
            <LiveTv />
            <span>TV Shows</span>
          </li>
        </NavLink>
        <NavLink
          to="/mylist"
          className="sidebar-link"
          onClick={onClose}
        >
          <li className="sidebar-item">
            <FavoriteBorder />
            <span>My List</span>
          </li>
        </NavLink>
        <li
          className="sidebar-item"
          onClick={onClose}
        >
          <Search />
          <span>Search</span>
        </li>
        <li
          className="sidebar-item"
          onClick={onClose}
        >
          <Notifications />
          <span>Notification</span>
        </li>
        <li
          className="sidebar-item"
          onClick={onClose}
        >
          <Settings />
          <span>Settings</span>
        </li>
        <li
          className="sidebar-item"
          onClick={onClose}
        >
          <img
            src="https://i.pinimg.com/550x/e3/94/30/e39430434d2b8207188f880ac66c6411.jpg"
            alt="Profile"
            title="Profile"
            className="profile-image"
          />
          <span className={currentUser ? "currentUser" : null}>
            {currentUser ? currentUser.username : null}
          </span>
        </li>
        <hr className="horizontal-line" />
        <li
          className="signout-item"
          onClick={handleLogout}
        >
          <Logout />
          <span>Sign out</span>
        </li>
        <Close
          className="menu-close"
          onClick={onClose}
        />
      </ul>
    </div>
  )
}

export default Sidebar
