import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movies: [],
  loading: false,
  genresLoaded: false,
  error: null,
  genres: [],
};

export const getGenres = createAsyncThunk("movies/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(
    `${process.env.REACT_APP_TMDB_BASE_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
  );

  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach(movie => {
    const movieGenres = [];
    movie.genre_ids.forEach(genre => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
  });
};

const getRawData = async (api, genres, paging) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchMovies = createAsyncThunk(
  "movies/trending",
  async ({ type }, thunkAPI) => {
    const {
      movies: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${process.env.REACT_APP_TMDB_BASE_URL}/trending/${type}/week?api_key=${process.env.REACT_APP_API_KEY}`,
      genres,
      true
    );
  }
);

export const fetchDataByGenre = createAsyncThunk(
  "movies/moviesByGenres",
  async ({ genre, type }, thunkAPI) => {
    const {
      movies: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${process.env.REACT_APP_TMDB_BASE_URL}/discover/${type}?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${genre}`,
      genres
    );
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getGenres.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.genres = action.payload;
        state.genresLoaded = true;
      })
      .addCase(getGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchDataByGenre.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataByGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDataByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;
