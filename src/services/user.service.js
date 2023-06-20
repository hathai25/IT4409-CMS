import {instanceCoreApi} from "./setupAxios.js";
import {USER_API} from "./apis/index.js";

export const getAllUser = async () => {
  return instanceCoreApi.get(USER_API.GET_ALL_USERS)
}

export const deleteUserInfo = async ({id}) => {
  return instanceCoreApi.delete(USER_API.DELETE_USER.replace(':id', id))
}


export const updateUserInfo = async (id, data) => {
  return instanceCoreApi.patch(USER_API.UPDATE_USER.replace(':id', id), data)
}

export const getUserAddressList = async (id) => {
  return instanceCoreApi.get(USER_API.GET_USER_ADDRESS.replace(':id', id))
}