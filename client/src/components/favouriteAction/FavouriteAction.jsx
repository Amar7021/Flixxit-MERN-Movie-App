import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { fetchMyList } from "../../redux/features/myListSlice"
import axios from "../../services/helper"
import { Add, Check } from "@mui/icons-material"
import "./favouriteAction.scss"

const FavouriteAction = ({ movie }) => {
  const { currentUser } = useSelector((state) => state.user)
  const favMovies = useSelector((state) => state.myLists.movies)
  const dispatch = useDispatch()

  //   Add to My List
  const handleAddToList = async (movie) => {
    try {
      await axios.post("/user/addmovie", {
        email: currentUser.email,
        data: movie,
      })
      dispatch(fetchMyList(currentUser.email))
      toast("Movie added to My List.", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      })
    } catch (error) {
      console.log(error)
      toast(error?.response?.data?.Error, {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      })
    }
  }

  // Remove from My List
  const handleRemoveFromList = async () => {
    try {
      await axios.put(`/user/removemovie`, {
        email: currentUser.email,
        movieId: movie?.id,
      })
      dispatch(fetchMyList(currentUser.email))
      toast("Movie removed from My List", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      })
    } catch (error) {
      console.log(error)
      toast(error?.response?.data?.Error, {
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
    <div className="toggle-icons">
      {favMovies?.some((favMovie) => favMovie?.id === movie?.id) ? (
        <div className="remove">
          <Check
            className="removeIcon"
            onClick={() => handleRemoveFromList(movie)}
          />
          <p className="removeFromList">Remove from My List</p>
        </div>
      ) : (
        <div className="add">
          <Add
            className="addIcon"
            onClick={() => handleAddToList(movie)}
          />
          <p className="addtoList">Add to My List</p>
        </div>
      )}
    </div>
  )
}

export default FavouriteAction
