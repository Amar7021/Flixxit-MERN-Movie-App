import { useDispatch, useSelector } from "react-redux"
import Navbar from "../../components/common/navbar/Navbar"
import { Favorite } from "@mui/icons-material"
import MovieCard from "../../components/movieCard/MovieCard"
import Footer from "../../components/common/footer/Footer"
import { useEffect, useState } from "react"
import { fetchMyList } from "../../redux/features/myListSlice"
import { createPortal } from "react-dom"
import FavCardSkeleton from "../../components/skeleton/favCardSkeleton/FavCardSkeleton"
import ClearListModal from "../../components/modal/clearListModal/ClearListModal"
import ColumnWrapper from "../../components/columnWrapper/ColumnWrapper"
import axios from "../../services/helper"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import "./myList.scss"

const MyList = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)
  const { movies, loading } = useSelector((state) => state.myLists)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchMyList(currentUser.email))
  }, [dispatch, currentUser.email])

  // Remove from My List
  const handleRemoveFromList = async (movie) => {
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
    <>
      <div className="myList">
        <Navbar />
        <ColumnWrapper>
          <div className="favContainer">
            <h2>
              <Favorite className="heartIcon" /> Your Favourites:{" "}
              {movies?.length}
            </h2>
            {movies?.length > 0 && (
              <>
                <button
                  type="button"
                  className="clear-btn"
                  onClick={() => setIsOpen(true)}
                >
                  Clear List
                </button>
                {isOpen &&
                  createPortal(
                    <ClearListModal setIsOpen={setIsOpen} />,
                    document.body
                  )}
              </>
            )}
          </div>
          {loading ? (
            <FavCardSkeleton cards={movies?.length} />
          ) : movies?.length === 0 ? (
            <div className="watchLater">
              <h2 className="laterTitle">
                Add Something In Your List To Watch Later.
              </h2>
            </div>
          ) : (
            <div className="favLists">
              {movies?.map((movie) => (
                <div
                  className="list-item"
                  key={movie?.id}
                >
                  <Link to={`/detail/${movie?.media_type}/${movie?.id}`}>
                    <MovieCard movie={movie} />
                  </Link>
                  <button
                    className="remove-fav-btn"
                    onClick={() => handleRemoveFromList(movie)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </ColumnWrapper>
      </div>
      <Footer />
    </>
  )
}

export default MyList
