import { Suspense, lazy } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NoMatch from "./components/noMatch/NoMatch"
import Signin from "./pages/signin/Signin"
import Signup from "./pages/signup/Signup"
import LoadingPage from "./components/loadingSVGs/LoadingPage"
import { Toaster } from "react-hot-toast"
import ProtectedRoutes from "./components/ProtectedRoutes"
import { SkeletonTheme } from "react-loading-skeleton"
import "./app.scss"

const LazyHome = lazy(() => import("./pages/home/Home"))
const LazyMyList = lazy(() => import("./pages/myList/MyList"))
const LazyExplore = lazy(() => import("./pages/explore/Explore"))
const LazyDetail = lazy(() => import("./pages/detail/Detail"))

const App = () => {
  return (
    <SkeletonTheme
      baseColor="#202020"
      highlightColor="#444"
    >
      <Router>
        <Toaster
          position="bottom-right"
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
              path="/explore/:type"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <LazyExplore />
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
              path="/detail/:type/:id"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <LazyDetail />
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
    </SkeletonTheme>
  )
}

export default App
