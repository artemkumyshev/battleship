import axios from "axios";

export const BASE_URL = "http://localhost:8787/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 1000,
});
