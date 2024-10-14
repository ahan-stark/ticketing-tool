import React, { SyntheticEvent, useRef, useState, useEffect } from "react";
import { Login } from "../../utils/auth/Login";
import SignUpModuleCSS from "./SignUp.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../../hooks/auth/useGetAllUsers";

const SignUpPage = () => {
  const navigate = useNavigate();
  const userName = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [successMsg, setSuccessMsg] = useState<string>();
  const [loginDetails, setLoginDetails] = useState<Login | undefined>(
    undefined
  );

  const { user: userInfo, loading } = useGetUser(
    loginDetails?.userName ?? undefined
  );
  const clearInputs = () => {
    if (userName.current) userName.current.value = "";
    if (password.current) password.current.value = "";
  };

  useEffect(() => {
    console.log(userInfo);
    if (loginDetails?.userName && loginDetails?.password) {
      if (loading) return;
      if (userInfo !== undefined && userInfo !== null) {
        setSuccessMsg("");
        setErrorMsg("User already registered");
        clearMsg(setErrorMsg);
        return;
      } else if (userInfo === null) {
        registerUser(loginDetails);
        setSuccessMsg("Successfully Registered");
        clearMsg(setSuccessMsg);
        clearInputs();
        setTimeout(() => {
          navigateToLogin();
        }, 2000);
        return;
      }
    }
  }, [loginDetails, userInfo, loading]);

  const clearMsg = (
    setMsg: React.Dispatch<React.SetStateAction<string | undefined>>
  ): void => {
    setTimeout(() => {
      setMsg("");
    }, 2000);
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const registerUser = async (loginDetails: Login): Promise<void> => {
    try {
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });
    } catch (error) {
      setErrorMsg("Failed to register user");
      clearMsg(setErrorMsg);
    }
  };

  const signIn = (event: SyntheticEvent): void => {
    event.preventDefault();
    if (!userName.current?.value) {
      setErrorMsg("Enter username");
      clearMsg(setErrorMsg);
      return;
    } else if (!password.current?.value) {
      setErrorMsg("Enter password");
      clearMsg(setErrorMsg);
      return;
    } else {
      setLoginDetails({
        userName: userName.current.value,
        password: password.current.value,
      });
    }
  };
  return (
    <>
      <div className={SignUpModuleCSS.signUpHeading}>Sign Up</div>
      <form className={SignUpModuleCSS.signUpForm} onSubmit={signIn}>
        <input type="text" placeholder="Username" ref={userName} />
        <input type="text" placeholder="Password" ref={password} />
        <Button
          type="submit"
          variant="contained"
          size="small"
          data-testid="signInBtn"
        >
          Sign Up
        </Button>
        <div
          className={SignUpModuleCSS.accountExists}
          onClick={navigateToLogin}
        >
          Already have an account?
        </div>
        <div>
          {errorMsg && (
            <div className={SignUpModuleCSS.errorMsg} data-testid="errorMsg">
              {errorMsg}
            </div>
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
