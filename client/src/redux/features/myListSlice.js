import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../services/helper"

const initialState = {
  movies: [],
  loading: false,
  error: null,
}

// Async thunk for fetching user's favorite movies
export const fetchMyList = createAsyncThunk(
  "myLists/fetchMyList",
  async (email) => {
    try {
      const response = await axios.get(`/user/favorite/${email}`)
      return response.data.movies
    } catch (error) {
      throw error.response.data
    }
  }
)

const myListsSlice = createSlice({
  name: "myLists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch My List
    builder.addCase(fetchMyList.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchMyList.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.movies = action.payload
    })
    builder.addCase(fetchMyList.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

export default myListsSlice.reducer
