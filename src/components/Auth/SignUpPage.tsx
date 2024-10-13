import React, { SyntheticEvent, useRef, useState } from "react";
import { checkIfValidUser, Login } from "../../utils/auth/Login";
import SignUpModuleCSS from "./SignUp.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useGetAllUsers from "../../hooks/auth/useGetAllUsers";

const SignUpPage = () => {
  const navigate = useNavigate();
  const allUSers: Login[] = useGetAllUsers();
  const loginDetails: Login = {
    userName: "",
    password: "",
  };
  const [errorMsg, setErrorMsg] = useState<string>();
  const [successMsg, setSuccessMsg] = useState<string>();
  const clearMsg = (
    setMsg: React.Dispatch<React.SetStateAction<string | undefined>>
  ): void => {
    setTimeout(() => {
      setMsg("");
    }, 2000);
  };
  const userName = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const navigateToLogin = () => {
    navigate("/login");
  };
  const registerUser = async (loginDetails: Login): Promise<void> => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    });
  };
  const signIn = (event: SyntheticEvent): void => {
    event.preventDefault();
    if (!userName.current?.value) {
      setErrorMsg("Enter username");
      clearMsg(setErrorMsg);
    } else if (!password.current?.value) {
      setErrorMsg("Enter password");
      clearMsg(setErrorMsg);
    }
    if (userName.current?.value && password.current?.value) {
      loginDetails.userName = userName.current.value;
      loginDetails.password = password.current.value;
      const userAlreadyPresent: boolean = checkIfValidUser(
        loginDetails,
        allUSers
      );
      if (userAlreadyPresent) {
        setErrorMsg("User already registered");
        clearMsg(setErrorMsg);
      }
      if (!userAlreadyPresent) {
        registerUser(loginDetails);
        setSuccessMsg("Successfully Registered");
        clearMsg(setSuccessMsg);
        setTimeout(() => {
          navigateToLogin();
        }, 2000);
      }
    }
  };
  return (
    <>
      <div className={SignUpModuleCSS.signUpHeading}>Sign Up</div>
      <form className={SignUpModuleCSS.signUpForm} onSubmit={signIn}>
        <input type="text" placeholder="Username" ref={userName} />
        <input type="text" placeholder="Password" ref={password} />
        <Button type="submit" variant="contained" size="small" data-testid = "signInBtn">
          Sign Up
        </Button>
        <div
          className={SignUpModuleCSS.accountExists}
          onClick={navigateToLogin}
        >
          Already have an account ?
        </div>
        <div>
          {errorMsg && (
            <div className={SignUpModuleCSS.errorMsg} data-testid = "errorMsg">{errorMsg}</div>
          )}
        </div>
        <div>
          {successMsg && (
            <div className={SignUpModuleCSS.successMsg}>{successMsg}</div>
          )}
        </div>
      </form>
    </>
  );
};

export default SignUpPage;
