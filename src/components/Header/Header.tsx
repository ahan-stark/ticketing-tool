import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addLogin, removeLogin } from "../../store/auth/LoginSlice";
import { Button } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();
  const curLocation = useLocation();
  const dispatch = useDispatch();
  const checkStorageForUser = localStorage.getItem("user");
  if (checkStorageForUser) {
    dispatch(addLogin());
  }
  const navigateToHome = (): void => {
    navigate("/home");
  };
  const isLoggedIn = useSelector((store: any) => store.authLogin.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) navigate("/home");
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn]);
  const logout = (): void => {
    localStorage.clear();
    dispatch(removeLogin());
  };
  return (
    <div>
      <div>Service Now</div>
      {isLoggedIn && (
        <Button variant="outlined" color="error" onClick={logout}>
          Log out
        </Button>
      )}
      {isLoggedIn && curLocation.pathname !== "/home" && (
        <Button variant="contained" onClick={navigateToHome}>
          Home
        </Button>
      )}
    </div>
  );
};

export default Header;
