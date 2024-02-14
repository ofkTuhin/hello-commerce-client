"use client";
// hooks/useAuth.ts
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  result: {
    id: number;
    username: string;
    accessToken?: string;
    refreshToken?: string;
  };
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<User>(
        "http://localhost:5001/api/v1/user/login",
        {
          email,
          password,
        },
      );
      console.log(response);
      if (response.status === 200) {
        setUser({ result: response.data.result! });
        console.log(response.data.result);
        localStorage.setItem(
          "accessToken",
          response?.data.result.accessToken! || "",
        );
        localStorage.setItem(
          "refreshToken",
          response?.data.result.refreshToken! || "",
        );
        // router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      // await axios.post("/api/logout");
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post<{ accessToken: string }>(
        "/api/refresh",
        { refreshToken: user?.result.refreshToken },
      );
      setUser((prevUser) => ({
        ...prevUser!,
        accessToken: response.data.accessToken,
      }));
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  };

  useEffect(() => {
    // Check if a refresh token is available and refresh the access token
    if (user?.result.refreshToken) {
      refreshToken();
    } else {
      setLoading(false);
    }
  }, []);
  console.log(user);
  return { user, loading, login, logout };
};

export default useAuth;
