import {
  Search,
  Notifications,
  ArrowDropDown,
  Logout,
  Settings,
} from "@mui/icons-material"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logoutSuccess } from "../../../redux/features/userSlice"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import DropDownPage from "../../dropDownMenus/dropDownLinks/DropDownLinks"
import DropDownProfile from "../../dropDownMenus/dropDownProfile/DropDownProfile"
import flixxitLogo from "../../../assets/flixxitLogo.png"
import axios from "../../../services/helper"
import toast from "react-hot-toast"
import "./navbar.scss"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const menuRef = useRef(null)
  const location = useLocation()

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
    handleOutsideClick(menuRef, setOpenMenu)
    handleOutsideClick(menuRef, setOpenProfile)
    window.scrollTo(0, 0)
  }, [menuRef, location])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY === 0 ? false : true)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout")
      dispatch(logoutSuccess())
      toast.success("Signout Successful!")
      navigate("/signin")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div
        className="container"
        ref={menuRef}
      >
        <div className="left">
          <Link to="/">
            <img
              src={flixxitLogo}
              alt="Flixxit logo"
            />
          </Link>
          <div className="mobileDropDown">
            <ArrowDropDown
              className="arrowDropDownLeft"
              onClick={() => setOpenMenu((prev) => !prev)}
            />
          </div>
          <div className={`dropDownMenu ${openMenu ? "visible" : "hidden"}`}>
            {openMenu && <DropDownPage />}
          </div>
          <NavLink
            to="/"
            className="link"
          >
            <span className="navigation_link">Home</span>
          </NavLink>
          <NavLink
            to="/tv"
            className="link"
          >
            <span className="navigation_link">TV Shows</span>
          </NavLink>
          <NavLink
            to="/movies"
            className="link"
          >
            <span className="navigation_link">Movies</span>
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
            onClick={() => setOpenProfile((prev) => !prev)}
          />
          <div
            className={`profileDropDown ${openProfile ? "visible" : "hidden"}`}
          >
            {openProfile && <DropDownProfile />}
          </div>
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
        </div>
      </div>
    </div>
  )
}

export default Navbar
