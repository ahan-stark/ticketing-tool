import React, { SyntheticEvent, useRef, useState, useEffect } from "react";
import {
  addUserToStorage,
  checkIfValidUser,
  Login,
} from "../../utils/auth/Login";
import { useGetUser } from "../../hooks/auth/useGetAllUsers";
import LoginModuleCSS from "./Login.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addLogin } from "../../store/auth/LoginSlice";
import { addUser } from "../../store/user/userSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [loginDetails, setLoginDetails] = useState<Login>({
    userName: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const user: Login[] | null = useGetUser(loginDetails.userName);
  const clearErrorMsg = (): void => {
    setTimeout(() => {
      setErrorMsg("");
    }, 2000);
  };
  const handleLogin = (event: SyntheticEvent): void => {
    event.preventDefault();
    if (!userName.current?.value) {
      setErrorMsg("Enter username");
      clearErrorMsg();
      return;
    } else if (!password.current?.value) {
      setErrorMsg("Enter password");
      clearErrorMsg();
      return;
    } else {
      setLoginDetails({
        userName: userName.current.value,
        password: password.current.value,
      });
      setTimeout(() => {
        setIsSubmitted(true);
      }, 100);
    }
  };

  useEffect(() => {
    if (!isSubmitted) return;
    if (loginDetails.userName && loginDetails.password) {
      if (user) {
        const isValidUser = user
          ? checkIfValidUser(loginDetails, user[0])
          : false;
        if (isValidUser) {
          addUserToStorage(user[0]);
          dispatch(addLogin());
          dispatch(addUser(user[0]));
          setIsSubmitted(false);
        } else {
          setErrorMsg("Username and Password not matching");
          clearErrorMsg();
          setIsSubmitted(false);
        }
      }
    }
    setIsSubmitted(false);
  }, [isSubmitted]);

  const navigateToSignUp = (): void => {
    navigate("/signin");
  };

  return (
    <div>
      <div className={LoginModuleCSS.loginHeading}>Login</div>
      <form className={LoginModuleCSS.loginForm} onSubmit={handleLogin}>
        <input type="text" placeholder="Username" ref={userName} />
        <input type="text" placeholder="Password" ref={password} />
        <Button
          type="submit"
          variant="contained"
          size="small"
          data-testid="logInBtn"
        >
          Login
        </Button>
        <div className={LoginModuleCSS.newUserTab} onClick={navigateToSignUp}>
          New user?
        </div>
        <div>
          {errorMsg && (
            <div className={LoginModuleCSS.errorMsg} data-testid="error-msg">
              {errorMsg}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
