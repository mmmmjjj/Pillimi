import { apiInstance } from "./index.js";

async function getPillInfo(sucess, fail) {
  await apiInstance().get(`/medicine/1`).then(sucess).catch(fail);
}

export { getPillInfo };
