import axios from "axios";

export const viettelAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VIETTEL_API_URL,
});

export const viettelLocationAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VIETTEL_LOCATION_API_URL,
});
