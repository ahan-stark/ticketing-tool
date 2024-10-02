import React, { SyntheticEvent, useRef } from "react";
import { Login } from "../../utils/Auth/Login";
import useGetAllUsers from "../../hooks/Auth/useGetAllUsers";
import LoginModuleCSS from "./Login.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const allUSers: Login[] = useGetAllUsers();
  const userName = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const loginDetails: Login = {
    userName: "",
    password: "",
  };
  const navigateToSignUp = () => {
    navigate("/signin")
  }
  const handleLogin = (event: SyntheticEvent): void => {
    event.preventDefault();
    if (userName.current?.value && password.current?.value) {
      loginDetails.userName = userName.current.value;
      loginDetails.password = password.current.value;
      const isValidUser: boolean = allUSers.some(
        (user: Login) =>
          user.userName === loginDetails.userName &&
          user.password === loginDetails.password
      );
      console.log(isValidUser);
    }
  };

  return (
    <div>
      <div className={LoginModuleCSS.loginHeading}>Login</div>
      <form className={LoginModuleCSS.loginForm} onSubmit={handleLogin}>
        <input type="text" placeholder="username" ref={userName} />
        <input type="text" placeholder="password" ref={password} />
        <Button variant="contained" size="small">Login</Button>
        <div className={LoginModuleCSS.newUserTab} onClick={navigateToSignUp}>New user ?</div>
      </form>
    </div>
  );
};

export default LoginPage;
