import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addLogin, removeLogin } from "../../store/auth/LoginSlice";
import { Button } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkStorageForUser = localStorage.getItem("user");
  if (checkStorageForUser) {
    dispatch(addLogin());
  }
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
    </div>
  );
};

export default Header;
