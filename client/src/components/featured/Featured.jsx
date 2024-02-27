import { PlayArrow } from "@mui/icons-material"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import "./featured.scss"

const Featured = () => {
  const [movie, setMovie] = useState({})

  useEffect(() => {
    const getRandomMovie = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_TMDB_BASE_URL}/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_networks=213`
        )
        setMovie(
          response.data.results[
            Math.floor(Math.random() * response.data.results.length - 1)
          ]
        )
      } catch (error) {
        console.log(error)
      }
    }
    getRandomMovie()
  }, [])

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string
  }

  return (
    <>
      <div
        className="featured"
        style={{
          backgroundSize: "cover",
          backgroundImage: `linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111), url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
          backgroundPosition: "center center",
        }}
      >
        <div className="info">
          <h1 className="movieTitle">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <span className="movieDesc">{truncate(movie?.overview, 140)}</span>
          <div className="buttons">
            <Link
              to="/watch"
              state={{ movie }}
              style={{ textDecoration: "none" }}
            >
              <button className="play">
                <PlayArrow className="playIcon" />
                <span>Play</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Featured
