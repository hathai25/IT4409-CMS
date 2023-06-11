import {instanceCoreApi} from "./setupAxios.js";
import {USER_API} from "./apis/index.js";

export const getAllUser = async () => {
  return instanceCoreApi.get(USER_API.GET_ALL_USERS, {
    baseURL: 'http://localhost:3001'
  })
}

export const deleteUserInfo = async ({id}) => {
  return instanceCoreApi.delete(USER_API.DELETE_USER.replace(':id', id), {
    baseURL: 'http://localhost:3001'
  })
}
