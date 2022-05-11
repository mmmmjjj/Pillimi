import { apiInstance, apiInstance2 } from "./index.js";

const api2 = apiInstance2();
const api = apiInstance();

async function getKakaoToken(code, success, fail) {
  await api2.get(`/member/kakao/token?code=${code}`).then(success).catch(fail);
}

async function getKakaoLogin(kakaoToken, success, fail) {
  await api2.get(`/member/kakao/login?accessToken=${kakaoToken}`).then(success).catch(fail);
}

function addRegInfo(regInfo, success, fail) {
  api.post(`/member/register`, regInfo).then(success).catch(fail);
}

function getMemberInfoDetail(memberSeq, success, fail) {
  api.get(`/member?memberSeq=${memberSeq}`).then(success).catch(fail);
}

function modifyMemberInfo(memberInfo, success, fail) {
  api.put(`/member`, memberInfo).then(success).catch(fail);
}

function getMemberMedicineList(memberSeq, success, fail) {
  api
    .get(`/member/medicine?protegeSeq=` + memberSeq)
    .then(success)
    .catch(fail);
}

function regmedicine(medinfo, success, fail) {
  api.post(`member/medicine`, medinfo).then(success).catch(fail);
}

function getMemberMedicineInfo(memberMedicineSeq, success, fail) {
  apiInstance().get(`/member/medicine/${memberMedicineSeq}`).then(success).catch(fail);
}

function deleteMemberMedicine(memberMedicineSeq, protegeSeq, success, fail) {
  apiInstance()
    .delete(`/member/medicine?memberMedicineSeq=${memberMedicineSeq}&protegeSeq=${protegeSeq}`)
    .then(success)
    .catch(fail);
}

function getMemberMedicineCheck(memberMedicineSeq, memberSeq, success, fail) {
  apiInstance()
    .get(`/member/medicine/check?medicineSeq=${memberMedicineSeq}&memberSeq=${memberSeq}`)
    .then(success)
    .catch(fail);
}

function postFcmToken(fcmToken, success, fail) {
  apiInstance().post(`/member/fcm?fcmToken=${fcmToken}`).then(success).catch(fail);
}

export {
  getKakaoToken,
  getKakaoLogin,
  addRegInfo,
  getMemberInfoDetail,
  modifyMemberInfo,
  getMemberMedicineList,
  regmedicine,
  getMemberMedicineInfo,
  deleteMemberMedicine,
  getMemberMedicineCheck,
  postFcmToken,
};
