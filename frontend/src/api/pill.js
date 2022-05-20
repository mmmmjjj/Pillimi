import { apiInstance } from "./index.js";

function getPillInfo(pillSeq, sucess, fail) {
  apiInstance().get(`/medicine/${pillSeq}`).then(sucess).catch(fail);
}

function getPillSearch(searchKeyword, sucess, fail) {
  apiInstance().get(`/search?keyword=${searchKeyword}`).then(sucess).catch(fail);
}

function getPillToday(memberSeq, sucess, fail) {
  apiInstance().get(`/medicine/today?memberSeq=${memberSeq}`).then(sucess).catch(fail);
}

function getMyPillToday(sucess, fail) {
  apiInstance().get(`/medicine/today`).then(sucess).catch(fail);
}

export { getPillInfo, getPillSearch, getPillToday, getMyPillToday };
