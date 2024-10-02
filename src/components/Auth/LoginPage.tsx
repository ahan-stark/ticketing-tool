import React, { SyntheticEvent, useRef } from "react";
import { Login } from "../../utils/Auth/Login";
import useGetAllUsers from "../../hooks/Auth/useGetAllUsers";

const LoginPage = () => {
  const allUSers: Login[] = useGetAllUsers();
  const userName = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const loginDetails: Login = {
    userName: "",
    password: "",
  };
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
      <div>Login</div>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="username" ref={userName} />
        <input type="text" placeholder="password" ref={password} />
        <button>login</button>
      </form>
    </div>
  );
};

export default LoginPage;
