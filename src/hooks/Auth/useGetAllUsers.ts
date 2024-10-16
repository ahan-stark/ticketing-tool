import { useEffect, useState } from "react";
import { Login } from "../../utils/auth/Login";

export const useGetUser = (username: string | undefined) => {
  const [user, setUser] = useState<Login[] | null>(null);
  const fetchUser = async () => {
    const response = await fetch(
      `http://localhost:3000/users/?userName=${username}`
    );
    const json = await response.json();
    setUser(json);
  };
  useEffect(() => {
    fetchUser();
  }, [username]);
  return user;
};
