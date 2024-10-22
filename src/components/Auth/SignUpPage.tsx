import React, { SyntheticEvent, useRef, useState, useEffect } from "react";
import { addUserToStorage, Login } from "../../utils/auth/Login";
import SignUpModuleCSS from "./SignUp.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../../hooks/auth/useGetAllUsers";
import { addLogin } from "../../store/auth/LoginSlice";
import { addUser } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [successMsg, setSuccessMsg] = useState<string>();
  const [loginDetails, setLoginDetails] = useState<Login | undefined>(
    undefined
  );

  let userInfo: Login[] | null = useGetUser(
    loginDetails?.userName ?? undefined
  );
  const clearInputs = () => {
    if (userName.current) userName.current.value = "";
    if (password.current) password.current.value = "";
  };
  //below function is done so that user is redirected to homepage after successfull registration
  //since in registering we will be having only username and password so to obtain the details with id, we do this
  const proceedToHomePage = async (loginDetails: Login) => {
    const userDetails = await fetch(
      `http://localhost:3000/users?userName=${loginDetails.userName}`
    );
    const userdata: Login = await userDetails.json();
    addUserToStorage(userdata);
    dispatch(addLogin());
    dispatch(addUser(userdata));
  };

  useEffect(() => {
    if (loginDetails?.userName && loginDetails?.password) {
      if (!userInfo) return;
      if (userInfo && userInfo?.length !== 0) {
        setErrorMsg("User already registered");
        setSuccessMsg("");
        clearMsg(setErrorMsg);
        return;
      }
      if (userInfo && userInfo.length === 0) {
        registerUser(loginDetails);
        setSuccessMsg("Successfully Registered");
        setErrorMsg("");
        clearMsg(setSuccessMsg);
        clearInputs();
        setTimeout(() => {
          proceedToHomePage(loginDetails!);
        }, 2000);
      }
    }
  }, [userInfo]);

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
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }
    } catch (error) {
      setErrorMsg("Failed to register user");
      clearMsg(setErrorMsg);
    }
  };

  const signIn = (event: SyntheticEvent): void => {
    event.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
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
