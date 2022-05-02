import { apiInstance, apiInstance2 } from "./index.js";

const api2 = apiInstance2();

async function getKakaoToken(code, success, fail) {
  await api2.get(`/member/kakao/token?code=${code}`).then(success).catch(fail);
}

async function getKakaoLogin(kakaoToken, success, fail) {
  await api2.get(`/member/kakao/login?accessToken=${kakaoToken}`).then(success).catch(fail);
}

export { getKakaoToken, getKakaoLogin };
