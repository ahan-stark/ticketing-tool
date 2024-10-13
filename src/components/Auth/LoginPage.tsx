import React, { SyntheticEvent, useRef, useState } from "react";
import { checkIfValidUser, Login } from "../../utils/auth/Login";
import useGetAllUsers from "../../hooks/auth/useGetAllUsers";
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
  const [errorMsg, setErrorMsg] = useState<string>("");
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
    } else if (!password.current?.value) {
      setErrorMsg("Enter password");
      clearErrorMsg();
    }
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
      } else {
        setErrorMsg("Username and Password not matching");
        clearErrorMsg();
      }
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
        <input type="text" placeholder="Username" ref={userName} />
        <input type="text" placeholder="Password" ref={password} />
        <Button type="submit" variant="contained" size="small" data-testid = "logInBtn">
          Login
        </Button>
        <div className={LoginModuleCSS.newUserTab} onClick={navigateToSignUp}>
          New user ?
        </div>
        <div>
          {errorMsg && (
            <div className={LoginModuleCSS.errorMsg} data-testid = "error-msg">{errorMsg}</div>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
