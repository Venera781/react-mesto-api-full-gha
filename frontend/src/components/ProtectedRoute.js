import React from "react";
import { Navigate } from "react-router-dom";
import PathName from "../utils/PathNames";
import StateUser from "../utils/StateUser";

const ProtectedRoute = ({ element, userState }) => {
  switch (userState) {
    case StateUser.needCheck:
    case StateUser.checking:
      return <p>Загрузка...</p>;
    case StateUser.loggedIn:
      return element;
    case StateUser.idle:
      return null;
    case StateUser.error:
    default:
      return <Navigate to={PathName.login} replace />;
  }
};
export default ProtectedRoute;
