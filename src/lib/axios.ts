import axios from "axios";
const BASE_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5001/api/v1/"
    : "https://hello-commerce-server.vercel.app/api/v1/";
export const Axios = axios.create({
  baseURL: BASE_URL,
});
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});
