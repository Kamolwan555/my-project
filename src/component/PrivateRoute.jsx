import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

export function PrivateRoute(props) {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return <Navigate to="/login" />;

  return props.children;
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
