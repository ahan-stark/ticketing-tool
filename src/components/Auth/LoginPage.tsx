import React, { SyntheticEvent, useRef } from "react";
import { checkIfValidUser, Login } from "../../utils/auth/Login";
import useGetAllUsers from "../../hooks/Auth/useGetAllUsers";
import LoginModuleCSS from "./Login.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addLogin } from "../../store/auth/LoginSlice";
import { addUser } from "../../store/user/userSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allUSers: Login[] = useGetAllUsers();
  const userName = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const loginDetails: Login = {
    userName: "",
    password: "",
  };
  const navigateToSignUp = (): void => {
    navigate("/signin");
  };
  const handleLogin = (event: SyntheticEvent): void => {
    event.preventDefault();
    if (userName.current?.value && password.current?.value) {
      loginDetails.userName = userName.current.value;
      loginDetails.password = password.current.value;
      const isValidUser = checkIfValidUser(loginDetails, allUSers);
      if (isValidUser) {
        const userDetails: Login[] = allUSers.filter(
          (user: Login) =>
            user.userName === userName.current?.value &&
            user.password === password.current?.value
        );
        localStorage.setItem("user", JSON.stringify(userDetails[0]));
        dispatch(addLogin());
        dispatch(addUser(userDetails[0]));
        console.log(userDetails);
      }
      console.log(isValidUser);
    }
  };

  return (
    <div>
      <div className={LoginModuleCSS.loginHeading}>Login</div>
      <form
        className={LoginModuleCSS.loginForm}
        onSubmit={(event: SyntheticEvent) => {
          handleLogin(event);
        }}
      >
        <input type="text" placeholder="username" ref={userName} />
        <input type="text" placeholder="password" ref={password} />
        <Button type="submit" variant="contained" size="small">
          Login
        </Button>
        <div className={LoginModuleCSS.newUserTab} onClick={navigateToSignUp}>
          New user ?
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
