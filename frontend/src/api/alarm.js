import { apiInstance } from "./index.js";

const api = apiInstance();

function getProtegeSeqAlarmList(protegeSeq, success, fail) {
  api.get(`/alarm/protector?protegeSeq=${protegeSeq}`).then(success).catch(fail);
}

function getProtegeSeqAlarmDetail(alarmSeq, success, fail) {
  api.get(`/alarm/protector/${alarmSeq}`).then(success).catch(fail);
}

function deleteProtegeSeqAlarm(alarmSeq, success, fail) {
  api.delete(`/alarm/protector/${alarmSeq}`).then(success).catch(fail);
}

function getAlarmPillList(alarmSeq, success, fail) {
  api.get(`/alarm/protege/${alarmSeq}`).then(success).catch(fail);
}

function addPillTakePicture(imgInfo, success, fail) {
  api.post(`/alarm/protege`, imgInfo).then(success).catch(fail);
}

export { getProtegeSeqAlarmList, getProtegeSeqAlarmDetail, deleteProtegeSeqAlarm, getAlarmPillList, addPillTakePicture };