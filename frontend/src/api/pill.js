import { apiInstance } from "./index.js";

function getPillInfo(sucess, fail) {
  apiInstance().get(`/medicine/1`).then(sucess).catch(fail);
}

function getPillSearch(searchKeyword, sucess, fail) {
  apiInstance().get(`/search?keyword=${searchKeyword}`).then(sucess).catch(fail);
}

export { getPillInfo, getPillSearch };
