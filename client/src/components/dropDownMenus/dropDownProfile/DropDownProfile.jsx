import { Logout, Notifications, Search, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../../redux/features/userSlice";
import toast from "react-hot-toast";
import axios from "../../../services/helper";
import "./dropDownProfile.scss";

const DropDownProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      dispatch(logoutSuccess());
      toast.success("Logout Successful!");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dropDownProfile">
      <ul>
        <li>
          <img
            src="https://i.pinimg.com/550x/e3/94/30/e39430434d2b8207188f880ac66c6411.jpg"
            alt="Profile"
            className="profileIcon"
          />
          Profile
        </li>
        <li>
          <Search className="profileIcon" />
          Search
        </li>
        <li>
          <Notifications className="profileIcon" />
          Notifications
        </li>
        <li>
          <Settings className="profileIcon" />
          Settings
        </li>
        <li onClick={handleLogout}>
          <Logout className="profileIcon" />
          Sign out of Flixxit
        </li>
      </ul>
    </div>
  );
};

export default DropDownProfile;
