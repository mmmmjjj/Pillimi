import axios from "axios";
import { API_BASE_URL } from "../config";

// 헤더에 토큰을 가지는 axios 객체 생성
function apiInstance() {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ` + token,
    },
  });
  return instance;
}

// axios 객체 생성
function apiInstance2() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

export { apiInstance, apiInstance2 };
