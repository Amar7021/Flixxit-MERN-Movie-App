import Navbar from "../../components/common/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import Slider from "../../components/slider/Slider";
import { useEffect } from "react";
import Footer from "../../components/common/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../../redux/features/moviesSlice";
import "./home.scss";

const Home = () => {
  const genresLoaded = useSelector(state => state.movies.genresLoaded);
  const movies = useSelector(state => state.movies.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded, dispatch]);

  return (
    <>
      <div className="home">
        <Navbar />
        <Featured />
        <Slider movies={movies} />
        <Footer />
      </div>
    </>
  );
};

export default Home;
