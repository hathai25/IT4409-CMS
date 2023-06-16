import {instanceCoreApi} from "./setupAxios.js";
import {MEDIA_API} from "./apis/index.js";

export const createMedia = async (data) => {
  return instanceCoreApi.post(MEDIA_API.CREATE_MEDIA, data)
}