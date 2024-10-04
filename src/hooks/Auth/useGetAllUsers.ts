import React, { useEffect, useState } from "react";
import { Login } from "../../utils/auth/Login";

const useGetAllUsers = () => {
  const [allUsers, setallUsers] = useState<Login[]>([]);
  const fetchAllUSers = async (): Promise<void> => {
    const data = await fetch("http://localhost:3000/users");
    const json = await data.json();
    setallUsers(json);
  };
  useEffect(() => {
    fetchAllUSers();
  }, []);
  return allUsers;
};

export default useGetAllUsers;
