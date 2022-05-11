import { apiInstance } from "./index.js";

const api = apiInstance();

function getMyFamily(sucess, fail) {
  api.get(`/family`).then(sucess).catch(fail);
}

function getFamilyRequest(success, fail) {
  api.get(`/family/request`).then(success).catch(fail);
}

function addFamily(familyRequestSeq, success, fail) {
  api.post(`/family/add?familyRequestSeq=${familyRequestSeq}`).then(success).catch(fail);
}

function revertFamilyRequest(familyRequestSeq, success, fail) {
  api.delete(`/family/request?familyRequestSeq=${familyRequestSeq}`).then(success).catch(fail);
}

export { getMyFamily, getFamilyRequest, addFamily, revertFamilyRequest };
