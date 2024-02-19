"use client";
import { axiosPrivate } from "@/lib/axios";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

// Define interface for the data returned from the API

function useBackendApi() {
  const router = useRouter();
  const [data, setData] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user, logout } = useAuth();
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axiosPrivate.get("/product", {
          headers: {
            "Content-Type": "aplication/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")!).accessToken
            }`,
          },
        });

        setData(response.data.result as Product[]);
        setError(null);
      } catch (error: any) {
        console.log(error);
        if (error.response?.status === 403) {
          router.push("/login");
        }
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Cleanup function
    return () => {
      setData(null); // Reset data when unmounting component
    };
  }, []);

  return { data, loading, error };
}

export default useBackendApi;
