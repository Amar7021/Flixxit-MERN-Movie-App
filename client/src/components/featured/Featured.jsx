import React, { useState } from "react"
import Slider from "react-slick"
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import LoadinBars from "../loadingSVGs/LoadingBars"
import VideoPopup from "../videoPopup/VideoPopup"
import FeaturedInfo from "./featuredInfo/FeaturedInfo"
import "./featured.scss"

const PrevArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <ArrowBackIos
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  )
}

const NextArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <ArrowForwardIos
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  )
}

const Featured = ({ data, loading }) => {
  const [show, setShow] = useState(false)
  const [videoId, setVideoId] = useState(null)

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          arrows: false,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  const slicedMovies = data?.results?.slice(0, 10)

  return (
    <>
      <div className="featured">
        {loading ? (
          <div className="loadingSVG">
            <LoadinBars
              width={48}
              height={48}
            />
          </div>
        ) : (
          <Slider {...settings}>
            {slicedMovies?.map((movie) => (
              <div
                className="featuredContainer"
                key={movie.id}
              >
                <div
                  className="featuredWrapper"
                  style={{
                    backgroundImage: `linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111), url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
                  }}
                  key={movie.id}
                >
                  <FeaturedInfo
                    movie={movie}
                    setShow={setShow}
                    setVideoId={setVideoId}
                  />
                </div>
              </div>
            ))}
          </Slider>
        )}
        <div className="gradient-bottom"></div>
      </div>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </>
  )
}

export default Featured
