import { apiInstance } from "./index.js";

const api = apiInstance();

function requestAddFamily(memberInfo, success, fail){
  api.post(`/family/request`, memberInfo).then(success).catch(fail);
}

function getMyFamily(sucess, fail) {
  api.get(`/family`).then(sucess).catch(fail);
}

export { requestAddFamily, getMyFamily };
