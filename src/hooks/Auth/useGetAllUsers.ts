import { useEffect, useState } from "react";
import { Login } from "../../utils/auth/Login";

export const useGetUser = (username: string | undefined) => {
  const [user, setUser] = useState<Login | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllUsers = async (): Promise<void> => {
      if (username) {
        setLoading(true);
        try {
          const response = await fetch(
            `http://localhost:3000/users/?userName=${username}`
          );
          const json = await response.json();
          setUser(json[0] || null);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAllUsers();
  }, [username]);

  return { user, loading };
};
