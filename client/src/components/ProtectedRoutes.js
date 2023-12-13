import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "./AnimatedSVGs/LoadingPage";

const ProtectedRoutes = () => {
  const { currentUser, loading } = useSelector(state => state.user);

  if (loading) {
    return <LoadingPage />;
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
