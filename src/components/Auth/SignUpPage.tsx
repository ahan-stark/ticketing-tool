import React, { SyntheticEvent, useRef } from "react";
import { Login } from "../../utils/Auth/Login";

const SignUpPage = () => {
  const loginDetails: Login = {
    userName: "",
    password: "",
  };

  const userName = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const registerUser = async (loginDetails: Login): Promise<void> => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    });
    console.log("success");
  };
  const signIn = (event: SyntheticEvent): void => {
    event.preventDefault();
    if (userName.current?.value && password.current?.value) {
      loginDetails.userName = userName.current.value;
      loginDetails.password = password.current.value;
      registerUser(loginDetails);
    }
  };
  return (
    <>
      <div>Sign Up</div>
      <form onSubmit={signIn}>
        <input type="text" placeholder="username" ref={userName} />
        <input type="text" placeholder="password" ref={password} />
        <button>Sign in</button>
      </form>
    </>
  );
};

export default SignUpPage;
