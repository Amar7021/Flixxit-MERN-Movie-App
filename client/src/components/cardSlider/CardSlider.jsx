import Card from "../card/Card"
import Slider from "react-slick"
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from "react-router-dom"
import MovieCardSkeleton from "../skeleton/movieCardSkeleton/MovieCardSkeleton"
import "./cardSlider.scss"

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

const CardSlider = ({ data, loading, endpoint }) => {
  const settings = {
    infinite: false,
    slidesToShow: 6,
    speed: 500,
    slidesToScroll: 3,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 576,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  return (
    <div className="card-slider">
      {loading ? (
        <MovieCardSkeleton cards={6} />
      ) : (
        <Slider {...settings}>
          {data?.map((movie) => (
            <Link
              to={`/detail/${movie.media_type || endpoint}/${movie.id}`}
              key={movie?.id}
            >
              <Card movie={movie} />
            </Link>
          ))}
        </Slider>
      )}
    </div>
  )
}

export default CardSlider
