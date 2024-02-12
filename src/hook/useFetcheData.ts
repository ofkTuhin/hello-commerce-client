"use client";
import { Product } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

// Define interface for the data returned from the API

function useBackendApi(endpoint: string) {
  const [data, setData] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get(endpoint);
        console.log(response);
        setData(response.data.result as Product[]);
        setError(null);
      } catch (error: any) {
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
  }, [endpoint]);

  return { data, loading, error };
}

export default useBackendApi;
