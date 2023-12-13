import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/features/modalSlice";
import axios from "../../../services/helper";
import { fetchMyList } from "../../../redux/features/myListSlice";
import toast from "react-hot-toast";
import "./myListModal.scss";

const MyListModal = ({ onClose }) => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  // Clear from My List
  const handleClearList = async () => {
    try {
      await axios.put("/user/clearallmovie", {
        email: currentUser.email,
      });
      dispatch(fetchMyList(currentUser.email));
      dispatch(closeModal());
      toast.success("My List is cleared");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.Error || "An error occurred");
    }
  };

  return (
    <>
      <div className="modalWrapper" onClick={onClose} />
      <div className="modalContainer">
        <h3 className="modalHeading">Clear My List?</h3>
        <p>Are you sure you want to clear your favourite list?</p>
        <div className="confirmModal">
          <button onClick={handleClearList} className="confirmBtn">
            Ok
          </button>
          <button onClick={onClose} className="clearBtn">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default MyListModal;
