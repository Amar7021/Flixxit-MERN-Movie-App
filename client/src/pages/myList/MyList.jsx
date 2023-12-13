import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/common/navbar/Navbar";
import { Favorite } from "@mui/icons-material";
import FavListItem from "../../components/favListItem/FavListItem";
import ConfirmModal from "../../components/modal/confirmModal/ConfirmModal";
import Footer from "../../components/common/footer/Footer";
import { useEffect } from "react";
import axios from "../../services/helper";
import toast from "react-hot-toast";
import { fetchMyList } from "../../redux/features/myListSlice";
import "./myList.scss";

const MyList = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const { movies, loading } = useSelector(state => state.myLists);

  useEffect(() => {
    dispatch(fetchMyList(currentUser.email));
  }, [dispatch, currentUser.email]);

  const removeFromList = async movieId => {
    try {
      await axios.put(`user/removemovie`, {
        email: currentUser.email,
        movieId,
      });
      dispatch(fetchMyList(currentUser.email));
      toast.success("Movie removed from My List");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.Error || "An error occurred");
    }
  };

  return (
    <>
      <div className="myList">
        <Navbar />
        <div className="container">
          <div className="favContainer">
            <h2>
              <Favorite className="heartIcon" /> Your Favourites:{" "}
              {movies?.length}
            </h2>
            <ConfirmModal movies={movies} />
          </div>
          {loading ? (
            <h1 style={{ color: "#fff", padding: "20px 0 0 50px" }}>
              Loading...
            </h1>
          ) : movies?.length === 0 ? (
            <h2 className="subHeading">
              Add Something In Your List To Watch Later.
            </h2>
          ) : (
            <div className="favlistItem">
              {movies.map(movie => (
                <FavListItem
                  key={movie.id}
                  movie={movie}
                  removeFromList={() => removeFromList(movie.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyList;
