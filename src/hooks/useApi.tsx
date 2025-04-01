/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

// Define the request parameters
interface ApiRequestParams {
  API_ENDPOINT: string;
  method?: "GET" | "POST" | "PUT" | "DELETE"; // Allowed HTTP methods
  data?: any; // Data for POST, PUT requests
  token?: string | null; // Optional authentication token
  redirect?: boolean;
}

// Define the API response type
interface ApiResponse {
  ok: boolean;
  data: any;
  status_code: number;
  response_status_code: number | undefined;
}

const useApi = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const router = useRouter();

  const request = async <T,>({
    API_ENDPOINT,
    method = "GET",
    data = null,
    token = null,
    redirect = true,
  }: ApiRequestParams): Promise<ApiResponse> => {
    setIsFetching(true);
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const config: AxiosRequestConfig = {
      url: API_ENDPOINT,
      method,
      data,
      headers,
    };

    try {
      const response: AxiosResponse<T> = await axios(config);
      setIsFetching(false);
      const data: any = response.data;
      return {
        ok: true,
        data: response.data,
        status_code: response.status,
        response_status_code: data["status_code"],
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status || 500;
      if (redirect) {
        if (status === 401) router.push("/signin");
        if (status === 403) router.push("/forbidden");
      }

      setIsFetching(false);
      setIsFetched(true);
      const data: any = axiosError.response?.data;
      return {
        ok: false,
        data: axiosError.response?.data,
        status_code: status,
        response_status_code: data["status_code"],
      };
    }
  };

  return { request, isFetching, isFetched };
};

export default useApi;
