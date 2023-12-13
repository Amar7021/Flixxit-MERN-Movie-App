import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/helper";

const initialState = {
  movies: [],
  loading: false,
  error: null,
};

// Async thunk for fetching user's favorite movies
export const fetchMyList = createAsyncThunk(
  "myLists/fetchMyList",
  async (email, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`/user/favorite/${email}`);
      dispatch(setLoading(false));
      return response.data.movies;
    } catch (error) {
      dispatch(setLoading(false));
      throw error.response.data;
    }
  }
);

const myListsSlice = createSlice({
  name: "myLists",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    // Fetch My List
    builder.addCase(fetchMyList.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMyList.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.movies = action.payload;
    });
    builder.addCase(fetchMyList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setLoading } = myListsSlice.actions;

export default myListsSlice.reducer;
