import { useState, useEffect } from "react";
import {isLogin} from "../auth/isLogin.js";
import { Navigate } from "react-router-dom";



const PrivateRoute = ({ element, ...rest }) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await isLogin();
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === undefined) {
    return null;
  }

  return isLoggedIn ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
