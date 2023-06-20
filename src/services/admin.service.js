import {instanceCoreApi} from "./setupAxios.js";
import {ADMIN_API} from "./apis/index.js";

export const getAdminList = () => {
  return instanceCoreApi.get(ADMIN_API.GET_ALL_ADMIN);
}

export const createAdmin = (data) => {
  return instanceCoreApi.post(ADMIN_API.CREATE_ADMIN, data);
}

export const updateAdmin = (id, data) => {
  return instanceCoreApi.patch(ADMIN_API.UPDATE_ADMIN.replace(':id', id), data);
}

export const lockAdmin = (id) => {
  return instanceCoreApi.patch(ADMIN_API.LOCK_ADMIN.replace(':id', id));
}

export const unlockAdmin = (id) => {
  return instanceCoreApi.patch(ADMIN_API.UNLOCK_ADMIN.replace(':id', id));
}

export const deleteAdmin = (id) => {
  return instanceCoreApi.delete(ADMIN_API.DELETE_ADMIN.replace(':id', id));
}

export const getDeletedAdminList = () => {
  return instanceCoreApi.get(ADMIN_API.GET_DELETED_ADMIN);
}