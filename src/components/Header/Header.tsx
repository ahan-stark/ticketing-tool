import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addLogin, removeLogin } from "../../store/auth/LoginSlice";
import { Button } from "@mui/material";
import { addUser, removeUser } from "../../store/user/userSlice";
import { removeAssignedTickets } from "../../store/tickets/TicketSlice";
import HeaderCSS from "./Header.module.css";
import { green, red, yellow } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import { RootState } from "../../store/store";
import { toggleHamBurger } from "../../store/hamBurger/HamBurgerSlice";

const Header = () => {
  const navigate = useNavigate();
  const curLocation = useLocation();
  const dispatch = useDispatch();
  const checkStorageForUser = localStorage.getItem("user");

  const loggedInStatus: boolean = useSelector(
    (store: RootState) => store.authLogin.isLoggedIn
  );
  const showHamBurger: boolean = useSelector(
    (store: RootState) => store.hamBurger.showHamBurger
  );
  if (checkStorageForUser) {
    if (!loggedInStatus) {
      dispatch(addLogin());
      dispatch(addUser(JSON.parse(checkStorageForUser)));
    }
  }
  const navigateToHome = (): void => {
    navigate("/home");
  };
  const isLoggedIn = useSelector((store: any) => store.authLogin.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) navigate("/home");
    if (!isLoggedIn && curLocation.pathname != "/signin") navigate("/login");
  }, [isLoggedIn]);
  const logout = (): void => {
    localStorage.clear();
    dispatch(removeLogin());
    dispatch(removeUser());
    dispatch(removeAssignedTickets());
  };
  return (
    <div className={HeaderCSS.headerLayout}>
      {isLoggedIn && curLocation.pathname === "/home" && (
        <MenuIcon
          onClick={() => {
            dispatch(toggleHamBurger(!showHamBurger));
          }}
          sx={{
            cursor: "pointer",
            color: green[800],
            fontSize: "2.25em",
            marginTop: "5px",
            marginRight :"1%"
          }}
        />
      )}
      <div className={HeaderCSS.heading}>Service Now</div>
      <div className={HeaderCSS.btnFlex}>
        {isLoggedIn && curLocation.pathname !== "/home" && (
          <Button
            variant="contained"
            onClick={navigateToHome}
            className={HeaderCSS.homeBtn}
          >
            Home
          </Button>
        )}
        {isLoggedIn && (
          <Button
            variant="outlined"
            color="error"
            onClick={logout}
            className={HeaderCSS.logOutBtn}
            sx={{ background: red[600], color: yellow[500] }}
          >
            Log out
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
