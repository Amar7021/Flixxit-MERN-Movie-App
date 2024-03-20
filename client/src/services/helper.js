import axios from "axios"
import { BASE_URL, headers } from "../utils/constants/constants"

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  withCredentials: true,
})

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    })
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export default API
