import {instanceCoreApi} from "./setupAxios.js";

export const registerUser = async (data) => {
  return instanceCoreApi.post('/auth/register', data)
}

export const loginUser = async (data) => {
  return instanceCoreApi.post('/admin/login', data)
}