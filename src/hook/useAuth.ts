"use client";
import { Axios } from "@/lib/axios";
// hooks/useAuth.ts
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Response {
  result: User;
}
interface User {
  name: string;
  email: string;
  accessToken?: string;
}
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const router = useRouter();

  // Function to read access token from local storage

  const login = async (email: string, password: string) => {
    try {
      const response = await Axios.post<Response>(
        "user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {},
        },
      );

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.result!));
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      Cookies.remove("refreshToken");
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")!));
  }, []);
  return { user, loading, login, setToken, token, logout };
};

export default useAuth;
