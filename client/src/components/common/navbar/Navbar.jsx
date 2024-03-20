import {
  Search,
  Notifications,
  ArrowDropDown,
  Logout,
  Settings,
  Menu,
} from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logoutSuccess } from "../../../redux/features/userSlice"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import flixxitLogo from "../../../assets/flixxitLogo.png"
import axios from "../../../services/helper"
import toast from "react-hot-toast"
import Sidebar from "../../sidebar/Sidebar"
import "./navbar.scss"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY === 0 ? false : true)
    }

    window.addEventListener("scroll", handleScroll)
    window.scrollTo(0, 0)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [location])

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout")
      dispatch(logoutSuccess())
      toast("Signout Successful!", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      })
      navigate("/signin")
      setOpenMenu(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className={isScrolled ? "navbar scrolled" : "navbar"}>
        <div className="container">
          <div className="left">
            <Link to="/">
              <img
                src={flixxitLogo}
                alt="Flixxit logo"
              />
            </Link>
            <NavLink
              to="/"
              className="link"
            >
              <span className="navigation_link">Home</span>
            </NavLink>
            <NavLink
              to="/explore/movie"
              className="link"
            >
              <span className="navigation_link">Movies</span>
            </NavLink>
            <NavLink
              to="/explore/tv"
              className="link"
            >
              <span className="navigation_link">TV Shows</span>
            </NavLink>
            <NavLink
              to="/mylist"
              className="link"
            >
              <span className="navigation_link">My List</span>
            </NavLink>
          </div>
          <div className="right">
            <Search className="icon searchIcon" />
            <Notifications className="icon notificationIcon" />
            <span className={currentUser ? "loggedinUser" : null}>
              {currentUser ? currentUser.username : null}
            </span>
            <img
              src="https://i.pinimg.com/550x/e3/94/30/e39430434d2b8207188f880ac66c6411.jpg"
              alt="Profile"
              title="Profile"
              className="profile-img"
            />
            <div className="profile">
              <ArrowDropDown className="icon dropdownIcon" />
              <div className="options">
                <span>
                  <Settings className="profileIcon" />
                  Settings
                </span>
                <span onClick={handleLogout}>
                  <Logout className="profileIcon" />
                  Sign out of Flixxit
                </span>
              </div>
            </div>
            <Sidebar
              onClose={() => setOpenMenu(false)}
              openMenu={openMenu}
              currentUser={currentUser}
              handleLogout={handleLogout}
            />
            <Menu
              className="mobile-menu"
              onClick={() => setOpenMenu(!openMenu)}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
