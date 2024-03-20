import Slider from "react-slick"
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from "react-router-dom"
import Card from "../card/Card"
import SuggestedItemSkeleton from "../skeleton/suggestedItemSkeleton/SuggestedItemSkeleton"
import "./carousel.scss"

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

const Carousel = ({ data, type, section, loading }) => {
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
    <div className="carousel">
      {loading ? (
        <SuggestedItemSkeleton cards={6} />
      ) : data?.results?.length > 0 ? (
        <Slider {...settings}>
          {data?.results?.map((item) => (
            <Link
              to={`/detail/${type}/${item.id}`}
              key={item?.id}
            >
              <Card movie={item} />
            </Link>
          ))}
        </Slider>
      ) : (
        <span className="no-info">
          There is no enough data to suggest in {section}.
        </span>
      )}
    </div>
  )
}

export default Carousel
