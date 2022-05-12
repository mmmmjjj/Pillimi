import axios from "axios";
import { API_BASE_URL } from "../config";

// 헤더에 토큰을 가지는 axios 객체 생성
function apiInstance() {
  const token = localStorage.getItem("ACCESS_TOKEN");
  // `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwicm9sZXMiOiJNRU1CRVIiLCJleHAiOjE4NjcwMzUwMTl9.cO0imtsCiklkEViB7s1n0KJk2kVdTTc59my6-rT7yQpSMWU6OYsajAQ1MdnY2knBT6WWPHfyHs89BWMiEroJKg`
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
