import axios from "axios";

type HeaderType = "auth" | "contentType";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

const headerSetting = {
  auth: axiosInstance.defaults.headers.common["Authorization"],
  contentType: axios.defaults.headers.post["Content-Type"],
};

export const setHeader = (type: HeaderType, value: string) => {
  headerSetting[type as HeaderType] = value;
};
