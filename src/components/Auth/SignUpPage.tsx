import React, { SyntheticEvent, useRef } from "react";
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
    if (userName.current?.value && password.current?.value) {
      loginDetails.userName = userName.current.value;
      loginDetails.password = password.current.value;
      const userAlreadyPresent: boolean = checkIfValidUser(
        loginDetails,
        allUSers
      );
      if (!userAlreadyPresent) {
        registerUser(loginDetails);
      }
    }
  };
  return (
    <>
      <div className={SignUpModuleCSS.signUpHeading}>Sign Up</div>
      <form className={SignUpModuleCSS.signUpForm} onSubmit={signIn}>
        <input type="text" placeholder="username" ref={userName} />
        <input type="text" placeholder="password" ref={password} />
        <Button type="submit" variant="contained" size="small">
          Sign Up
        </Button>
        <div
          className={SignUpModuleCSS.accountExists}
          onClick={navigateToLogin}
        >
          Already have an account ?
        </div>
      </form>
    </>
  );
};

export default SignUpPage;
