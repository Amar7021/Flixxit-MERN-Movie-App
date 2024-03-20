import { useState } from "react"
import SwitchTabs from "../../../components/switchTabs/SwitchTabs"
import useFetch from "../../../components/hooks/useFetch"
import CardSlider from "../../../components/cardSlider/CardSlider"
import "./popular.scss"

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie")
  const { data, loading } = useFetch(`/${endpoint}/popular`)

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv")
  }

  return (
    <div className="popular">
      <div className="popular-wrapper">
        <h2 className="popular-title">What's Popular</h2>
        <SwitchTabs
          data={["Movies", "TV Shows"]}
          onTabChange={onTabChange}
        />
      </div>
      <CardSlider
        data={data?.results}
        loading={loading}
        endpoint={endpoint}
      />
    </div>
  )
}

export default Popular
