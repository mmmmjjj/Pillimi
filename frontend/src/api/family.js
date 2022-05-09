import { apiInstance } from "./index.js";

const api = apiInstance();

function getMyFamily(sucess, fail) {
  api.get(`/family`).then(sucess).catch(fail);
}

export { getMyFamily };
