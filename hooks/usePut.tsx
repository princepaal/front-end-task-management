import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "@/tokenStore/tokenStore";

interface PutResponse<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  putData: (url: string, body: any) => Promise<T | null>;
}

export function usePut<T = any>(): PutResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const putData = async (url: string, body: any): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const token = await getToken(); // Ensure token fetching before making API call
      console.log("Token:", token);

      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      };

      const response = await axios.put<T>(url, body, config);
      console.log("PUT Response:", response.data);

      setData(response.data);
      return response.data; // Ensure the caller gets the response immediately
    } catch (err: any) {
      console.error("PUT Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, putData };
}
