import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { getToken } from "@/tokenStore/tokenStore";

interface PostResponse<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  postData: (url: string, body: any, token?: string) => Promise<{ data: T | null; error: string | null }>;
}

export function usePost<T = any>(): PostResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const postData = useCallback(async (url: string, body: any) => {
    setIsLoading(true);
    setError(null);
    const token = await getToken();

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    try {
      const response = await axios.post<T>(url, body, config);
      setData(response.data);
      return { data: response.data, error: null };
    } catch (err) {
      const axiosError = err as AxiosError;
      let errorMsg = "Network error: Unable to connect to the server.";
      if (axiosError.response?.data && typeof axiosError.response.data === "object") {
        errorMsg = axiosError.response.data?.message || "Server error";
      }
      setError(errorMsg);
      setData(null);
      return { data: null, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, error, isLoading, postData };
}