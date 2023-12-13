import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/common/footer/Footer";
import Navbar from "../../components/common/navbar/Navbar";
import { useEffect } from "react";
import { fetchMovies, getGenres } from "../../redux/features/moviesSlice";
import Slider from "../../components/slider/Slider";
import SelectGenre from "../../components/selectGenre/SelectGenre";
import "./tvShows.scss";

const TVShows = () => {
  const genresLoaded = useSelector(state => state.movies.genresLoaded);
  const movies = useSelector(state => state.movies.movies);
  const genres = useSelector(state => state.movies.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "tv" }));
  }, [genresLoaded, dispatch]);

  return (
    <div className="tvShows">
      <Navbar />
      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {movies.length ? (
          <Slider movies={movies} />
        ) : (
          <h2 className="notAvailable">
            No Movies Available For Selected Genre.
          </h2>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TVShows;
