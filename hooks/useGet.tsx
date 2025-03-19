import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { getToken } from "@/tokenStore/tokenStore";

export const useGet = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const authToken = await getToken();
      const headers = {
        "Content-Type": "application/json",
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      };
      const response = await axios.get<T>(url, { headers });
      setData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.response?.data || axiosError.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, isLoading, refetch: fetchData };
};