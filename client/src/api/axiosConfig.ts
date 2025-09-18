import axios, { AxiosError } from "axios";
import * as Sentry from "@sentry/react";
import { ApiError } from "./ApiError";

type HeaderType = "auth" | "contentType";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    Sentry.withScope((scope) => {
      scope.setContext("API Request", {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data,
      });
      scope.setContext("API Response", {
        status: error.response?.status,
        data: error.response?.data,
      });

      scope.setTag("type", "api");
      if (error.response?.status) {
        scope.setTag("status_code", error.response.status);
      }

      scope.setFingerprint([
        "{{default}}",
        error.config?.method || "unknown method",
        String(error.response?.status || "unknown status"),
        error.config?.url?.replace(/\/\d+/g, "/:id") || "unknown url",
      ]);

      const apiError = new ApiError(error);
      Sentry.captureException(apiError);
    });

    return Promise.reject(error);
  }
);

export const setHeader = (type: HeaderType, value: string) => {
  if (type === "auth") {
    axiosInstance.defaults.headers.common["Authorization"] = value;
  } else if (type === "contentType") {
    axiosInstance.defaults.headers.post["Content-Type"] = value;
    axiosInstance.defaults.headers.put["Content-Type"] = value;
    axiosInstance.defaults.headers.patch["Content-Type"] = value;
  }
};

export const clearHeader = (type: HeaderType) => {
  if (type === "auth") {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
