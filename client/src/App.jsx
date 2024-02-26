import { Suspense, lazy } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NoMatch from "./components/noMatch/NoMatch"
import Signin from "./pages/signin/Signin"
import Signup from "./pages/signup/Signup"
import LoadingPage from "./components/AnimatedSVGs/LoadingPage"
import { Toaster } from "react-hot-toast"
import ProtectedRoutes from "./components/ProtectedRoutes"
import "./app.scss"

const LazyHome = lazy(() => import("./pages/home/Home"))
const LazyMyList = lazy(() => import("./pages/myList/MyList"))
const LazyMovies = lazy(() => import("./pages/movies/Movies"))
const LazyTVShows = lazy(() => import("./pages/tvShows/TVShows"))
const LazyWatch = lazy(() => import("./pages/watch/Watch"))

const App = () => {
  return (
    <Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes>
        {/* *********** PRIVATE ROUTE **********************  */}
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyHome />
              </Suspense>
            }
          />

          <Route
            path="/tv"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyTVShows />
              </Suspense>
            }
          />
          <Route
            path="/movies"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyMovies />
              </Suspense>
            }
          />
          <Route
            path="/mylist"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyMyList />
              </Suspense>
            }
          />
          <Route
            path="/watch"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyWatch />
              </Suspense>
            }
          />
        </Route>

        {/* ***************** PUBLIC ROUTE ********************* */}
        <Route
          path="*"
          element={<NoMatch />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/signin"
          element={<Signin />}
        />
      </Routes>
    </Router>
  )
}

export default App
