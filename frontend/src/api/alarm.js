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

export { getProtegeSeqAlarmList, getProtegeSeqAlarmDetail, deleteProtegeSeqAlarm };