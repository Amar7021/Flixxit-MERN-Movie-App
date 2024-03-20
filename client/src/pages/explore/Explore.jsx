import Footer from "../../components/common/footer/Footer"
import Navbar from "../../components/common/navbar/Navbar"
import Featured from "../../components/featured/Featured"
import useFetch from "../../components/hooks/useFetch"
import ColumnWrapper from "../../components/columnWrapper/ColumnWrapper"
import { useEffect, useState } from "react"
import { fetchDataFromApi } from "../../services/helper"
import Select from "react-select"
import InfiniteScroll from "react-infinite-scroll-component"
import MovieCard from "../../components/movieCard/MovieCard"
import LoadinBars from "../../components/loadingSVGs/LoadingBars"
import { Link, useParams } from "react-router-dom"
import "./explore.scss"

let filters = {}

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
]

const Explore = () => {
  const [isMovies, setIsMovies] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [sortby, setSortby] = useState(null)
  const { type } = useParams()
  const { data, loading } = useFetch(`/trending/${type}/week`)

  const fetchInitialData = () => {
    setIsLoading(true)
    fetchDataFromApi(`/discover/${type}`, filters).then((res) => {
      setIsMovies(res)
      setPage((prev) => prev + 1)
      setIsLoading(false)
    })
  }

  const fetchNextPageData = () => {
    fetchDataFromApi(`/discover/${type}?page=${page}`, filters).then((res) => {
      if (isMovies?.results) {
        setIsMovies({
          ...isMovies,
          results: [...isMovies?.results, ...res.results],
        })
      } else {
        setIsMovies(res)
      }
      setPage((prev) => prev + 1)
    })
  }

  useEffect(() => {
    filters = {}
    setIsMovies(null)
    setPage(1)
    setSortby(null)
    fetchInitialData()
  }, [type])

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortby(selectedItems)
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value
      } else {
        delete filters.sort_by
      }
    }
    setPage(1)
    fetchInitialData()
  }

  return (
    <div className="explore">
      <Navbar />
      <Featured
        data={data}
        loading={loading}
      />
      <ColumnWrapper>
        <div className="page-headers">
          <div className="header-container">
            <h2 className="page-title">
              {type === "movie" ? "Explore Movies" : "Explore TV Shows"}
            </h2>
            <div className="filters">
              <Select
                name="sortby"
                value={sortby}
                options={sortbyData}
                onChange={onChange}
                isClearable={true}
                placeholder="Sort by"
                className="react-select-container sortbyDD"
                classNamePrefix="react-select"
              />
            </div>
          </div>
          {isLoading && (
            <LoadinBars
              width={36}
              height={36}
              initial={true}
            />
          )}
          {!isLoading && (
            <>
              {isMovies?.results?.length > 0 ? (
                <InfiniteScroll
                  className="content"
                  dataLength={isMovies?.results?.length || []}
                  next={fetchNextPageData}
                  hasMore={page <= isMovies?.total_pages}
                  loader={
                    <LoadinBars
                      width={36}
                      height={36}
                    />
                  }
                >
                  {isMovies?.results?.map((item, index) => {
                    return (
                      <Link
                        to={`/detail/${type}/${item?.id}`}
                        key={index}
                      >
                        <MovieCard movie={item} />
                      </Link>
                    )
                  })}
                </InfiniteScroll>
              ) : (
                <span className="result-not-found">
                  Sorry, Results not found!
                </span>
              )}
            </>
          )}
        </div>
      </ColumnWrapper>
      <Footer />
    </div>
  )
}

export default Explore
