import { useAuth } from "../Context/UserProvider";
import { Route, Navigate } from "react-router-dom";

export const PrivateRoute = ({ path, ...props }) => {
  const { login } = useAuth();

  return login ? (
    <Route {...props} />
  ) : (
    <Navigate state={{ from: path }} replace={true} to="/login" />
  );
};
