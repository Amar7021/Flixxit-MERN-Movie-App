import { useEffect, useState } from "react"
import { fetchDataFromApi } from "../../services/helper"

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDataFromApi(url)
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        setError(true)
        console.log(error)
      })
  }, [url])

  return { data, loading, error }
}

export default useFetch
