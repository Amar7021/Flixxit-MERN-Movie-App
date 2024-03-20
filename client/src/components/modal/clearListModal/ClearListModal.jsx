import { useDispatch, useSelector } from "react-redux"
import axios from "../../../services/helper"
import { fetchMyList } from "../../../redux/features/myListSlice"
import toast from "react-hot-toast"
import "./clearListModal.scss"

const ClearListModal = ({ setIsOpen }) => {
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  // Clear from My List
  const handleClearList = async () => {
    try {
      await axios.put("/user/clearallmovie", {
        email: currentUser.email,
      })
      dispatch(fetchMyList(currentUser.email))
      setIsOpen(false)
      toast("My List is cleared", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      })
      window.scrollTo(0, 0)
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.Error, {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      })
    }
  }

  return (
    <>
      <div
        className="myListModal"
        onClick={() => setIsOpen(false)}
      />
      <div className="modal">
        <div className="modalWrapper">
          <h3 className="modalHeading">Clear My List?</h3>
          <p>Are you sure you want to clear your favourite list?</p>
          <div className="confirmModal">
            <button
              onClick={handleClearList}
              className="confirmBtn"
              type="button"
            >
              Ok
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="clearBtn"
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ClearListModal
