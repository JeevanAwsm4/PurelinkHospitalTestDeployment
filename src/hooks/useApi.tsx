import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { useRouter } from "next/router";

// Define the request parameters
interface ApiRequestParams {
  API_ENDPOINT: string;
  method?: "GET" | "POST" | "PUT" | "DELETE"; // Allowed HTTP methods
  data?: Record<string, unknown> | null; // Data for POST, PUT requests
  token?: string | null; // Optional authentication token
}

// Define the API response type
interface ApiResponse<T = unknown> {
  ok: boolean;
  data: T | null;
  status_code: number;
}

const useApi = () => {
  const router = useRouter();

  const request = async <T,>({
    API_ENDPOINT,
    method = "GET",
    data = null,
    token = null,
  }: ApiRequestParams): Promise<ApiResponse<T>> => {
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
      return { ok: true, data: response.data, status_code: response.status };
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status || 500;

      if (status === 401) router.push("/login");
      if (status === 403) router.push("/forbidden");

      return {
        ok: false,
        data: (axiosError.response?.data as T) || null,
        status_code: status,
      };
    }
  };

  return request;
};

export default useApi;
