import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {
  const { currentUser } = useSelector((state) => state.user)

  return currentUser ? <Outlet /> : <Navigate to="/signin" />
}

export default ProtectedRoutes
