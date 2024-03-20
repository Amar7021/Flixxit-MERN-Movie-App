import { useParams } from "react-router-dom"
import { useState } from "react"
import Img from "../../../components/lazyLoadingImage/Img"
import dayjs from "dayjs"
import { PlayArrow } from "@mui/icons-material"
import VideoPopup from "../../../components/videoPopup/VideoPopup"
import PosterFallback from "../../../assets/poster-fallback.jpg"
import CircularRating from "../../../components/circularRating/CircularRating"
import BannerSkeleton from "../../../components/skeleton/bannerSkeleton/BannerSkeleton"
import useFetch from "../../../components/hooks/useFetch"
import FavouriteAction from "../../../components/favouriteAction/FavouriteAction"
import "./detailBanner.scss"

const DetailBanner = ({ video, crew }) => {
  const { type, id } = useParams()
  const [show, setShow] = useState(false)
  const [videoId, setVideoId] = useState(null)
  const { data, loading } = useFetch(`/${type}/${id}`)

  const movieData = data ? { ...data, media_type: type } : null

  const director = crew?.filter((p) => p.job === "Director")

  const writer = crew?.filter(
    (p) => p.job === "Screenplay" || p.job === "Story" || p.job === "Writer"
  )

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`
  }

  const moviePoster = data?.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${data?.backdrop_path}`
    : data?.profile_path
    ? `https://image.tmdb.org/t/p/original/${data?.profile_path}`
    : null

  return (
    <div className="detail-banner">
      <div className="backdrop-container">
        {data?.backdrop_path ? (
          <Img
            src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
            alt=""
            className="backdrop-image"
          />
        ) : data?.poster_path ? (
          <Img
            src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
            alt=""
            className="backdrop-image"
          />
        ) : null}
      </div>
      <div className="gradient-layer" />
      {loading ? (
        <BannerSkeleton />
      ) : (
        <>
          <div className="movie-details">
            {moviePoster ? (
              <Img
                src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
                alt={data?.original_title}
                className="movie-poster"
              />
            ) : (
              <Img
                src={PosterFallback}
                alt={data?.original_title}
                className="movie-poster"
              />
            )}
            <div className="right">
              <h2 className="movie-title">
                {`${data?.original_title || data?.title || data?.name} (${
                  data?.release_date
                    ? dayjs(data?.release_date).format("YYYY")
                    : data?.first_air_date
                    ? dayjs(data?.first_air_date).format("YYYY")
                    : "NA"
                })`}
              </h2>
              <div className="movie-genres">
                {data?.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="genres"
                  >
                    {genre?.name}
                  </span>
                ))}
              </div>
              <div className="rating-info">
                <span className="movie-rating">
                  <CircularRating rating={data?.vote_average?.toFixed(1)} />
                </span>
                <div className="play-info">
                  <button
                    className="play-movie"
                    onClick={() => {
                      setShow(true)
                      setVideoId(video.key)
                    }}
                  >
                    <PlayArrow className="play-icon" />
                  </button>
                  <span className="play-title">Play Trailer</span>
                </div>
                <span className="favourite-toggle">
                  <FavouriteAction movie={movieData} />
                </span>
              </div>
              <h3 className="movie-tagline">{data?.tagline}</h3>
              <div className="overview-info">
                {data?.overview && (
                  <>
                    <h3 className="overview-heading">Overview</h3>
                    <p className="overview-desc">{data?.overview}</p>
                  </>
                )}
              </div>
              <div className="movie-info">
                <div className="info-box">
                  {data?.status && (
                    <div className="movie-status">
                      <span className="status-title">Status:&nbsp;</span>
                      <span className="status">{data?.status}</span>
                    </div>
                  )}
                  {data?.release_date && (
                    <div className="date-info">
                      <span className="release-title">Release Date:&nbsp;</span>
                      <span className="release-date">
                        {data?.release_date
                          ? dayjs(data?.release_date).format("MMM D, YYYY")
                          : "NA"}
                      </span>
                    </div>
                  )}
                  {data?.runtime !== undefined && (
                    <div className="runtime-info">
                      <span className="runtime-title">Runtime:&nbsp;</span>
                      <span className="runtime">
                        {data?.runtime === 0
                          ? "Not Available"
                          : toHoursAndMinutes(data?.runtime)}
                      </span>
                    </div>
                  )}
                </div>
                <hr />
                {director?.length > 0 && (
                  <>
                    <div className="directior-info">
                      <span className="director-title">Director:&nbsp;</span>
                      {director?.map((d, i) => (
                        <span
                          key={i}
                          className="director-name"
                        >
                          {d.name}
                          {director.length - 1 !== i && ", "}
                        </span>
                      ))}
                    </div>
                    <hr />
                  </>
                )}
                {writer?.length > 0 && (
                  <div className="writer-info">
                    <span className="writer-title">Writer:&nbsp;</span>
                    {writer?.map((d, i) => (
                      <span
                        key={i}
                        className="writer-name"
                      >
                        {d.name}
                        {writer.length - 1 !== i && ", "}
                      </span>
                    ))}
                  </div>
                )}
                {data?.created_by?.length > 0 && (
                  <div className="creator-info">
                    <span className="creator-title">Creator:&nbsp;</span>
                    {data?.created_by?.map((d, i) => (
                      <span
                        key={i}
                        className="creator-name"
                      >
                        {d.name}
                        {data?.created_by.length - 1 !== i && ", "}
                      </span>
                    ))}
                  </div>
                )}
                <hr />
              </div>
            </div>
          </div>
          <VideoPopup
            show={show}
            setShow={setShow}
            videoId={videoId}
            setVideoId={setVideoId}
          />
        </>
      )}
    </div>
  )
}

export default DetailBanner
