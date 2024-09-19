import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let token =
    typeof sessionStorage.getItem("key") != "undefined"
      ? JSON.parse(sessionStorage.getItem("data"))
      : false;

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
