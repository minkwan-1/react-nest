import axios from "axios";

type HeaderType = "auth" | "contentType";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

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
