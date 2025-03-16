import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface PostResponse<T> {
  data: any
  error: string | null;
  isLoading: boolean;
  postData: (url: string, body: any, token?: string) => Promise<void>;
}

export function usePost<T = any>(): PostResponse<T> {
  const [data, setData] = useState({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const postData = async (url: string, body: any, token?: string) => {
    setIsLoading(true);
    setError(null);
  
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
  
    try {
      const response = await axios.post(url, body, config);
      console.log("Response received:", response.data);
      setData(response.data);
      return { data: response.data, error: null }; 
    } catch (err: any) {
      setData({});
      let errorMsg = "Network error: Unable to connect to the server.";
      if (err.response) {
        console.log("Response error data:", err.response.data);
        errorMsg = err.response.data?.message || "Server error";
      }
      setError(errorMsg);
      return { data: null, error: errorMsg }; //  Return error
    } finally {
      setIsLoading(false);
    }
  };
  

  return { data, error, isLoading, postData };
}
