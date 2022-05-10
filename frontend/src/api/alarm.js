import { apiInstance } from "./index.js";

const api = apiInstance();

function getProtegeSeqAlarmList(protegeSeq, success, fail) {
  api.get(`/alarm/protector?protegeSeq=${protegeSeq}`).then(success).catch(fail);
}

export { getProtegeSeqAlarmList };