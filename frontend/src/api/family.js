import { apiInstance } from "./index.js";

const api = apiInstance();

function requestAddFamily(memberInfo, success, fail){
  api.post(`/family/request`, memberInfo).then(success).catch(fail);
}

export { requestAddFamily };