import {instanceCoreApi} from "./setupAxios.js";
import {BANNER_API} from "./apis/index.js";

export const getAllBanner = async () => {
  return instanceCoreApi.get(BANNER_API.GET_ALL_BANNERS);
}
export const addBanner = async (data) => {
  return instanceCoreApi.post(BANNER_API.ADD_BANNER, data);
}

export const updateBanner = async (id, data) => {
  return instanceCoreApi.patch(BANNER_API.UPDATE_BANNER.replace(":id", id), data);
}

export const deleteBanner = async (id) => {
  return instanceCoreApi.delete(BANNER_API.DELETE_BANNER.replace(":id", id));
}

export const hideBanner = async (id, data) => {
  return instanceCoreApi.patch(BANNER_API.HIDE_BANNER.replace(":id", id), data);
}