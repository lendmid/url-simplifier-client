import { notification } from "antd";
import axios from "axios";

const { VITE_API_URL, PROD } = import.meta.env;
const API_URL = PROD ? "/api" : VITE_API_URL;

export interface AxiosError {
  response: {
    data: {
      error: string;
      message: string | string[];
    };
    status: number;
  };
  message: string;
  globalHandler(clientDescription?: string, clientMessage?: string): Error;
}

// Global error handler with possibility to modify an error on local level
const errorComposer =
  (error: AxiosError) =>
  (clientDescription: string = "", clientMessage: string = "") => {
    const statusCode = error.response ? error.response.status : null;

    const backEndErrors = error.response.data?.message;
    const errorReason = Array.isArray(backEndErrors)
      ? backEndErrors.join(", ")
      : backEndErrors;

    switch (statusCode) {
      case 401:
        notification.error({
          message: "Please login to access this resource",
          description: `Details: ${errorReason}`,
        });
        break;
      case 403:
        notification.error({
          message: "You don't have enough permissions to access the resource",
          description: `Details: ${errorReason}`,
        });
        break;
      default:
        notification.error({
          message: clientMessage || error.message,
          description:
            (clientDescription ? `${clientDescription}. ` : "") +
            `Details: ${errorReason}`,
        });
    }
    throw new Error(error.message);
  };

const axiosInstance = axios.create({ baseURL: API_URL });

axiosInstance.interceptors.response.use(
  (response) => response,
  (err: AxiosError) => {
    err.globalHandler = errorComposer(err);
    return Promise.reject(err);
  },
);

export { axiosInstance };
