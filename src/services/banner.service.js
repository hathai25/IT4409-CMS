import {instanceCoreApi} from "./setupAxios.js";
import {BANNER_API} from "./apis/index.js";

export const getAllBanner = async () => {
  return instanceCoreApi.get(BANNER_API.GET_ALL_BANNERS,{baseURL: "http://localhost:3001"});
}
export const addBanner = async (data) => {
  return instanceCoreApi.post(BANNER_API.ADD_BANNER, data,{baseURL: "http://localhost:3001"});
  
}

export const updateBanner = async (id, data) => {
  return instanceCoreApi.patch(BANNER_API.UPDATE_BANNER.replace(":id", id), data,{baseURL: "http://localhost:3001"});
}

export const deleteBanner = async (id) => {
  return instanceCoreApi.delete(BANNER_API.DELETE_BANNER.replace(":id", id),{baseURL: "http://localhost:3001"});
}
export const updateBannerShow = async (id, data) => {
  const updatedData = { ...data, isShow: 1 };
  return instanceCoreApi.patch(
    BANNER_API.UPDATE_BANNER_SHOW.replace(":id", id),
    updatedData,
    { baseURL: "http://localhost:3001" }
  );
};
export const updateBannerHidden = async (id, data) => {
  const updatedData = { ...data, isShow: 0 };
  return instanceCoreApi.patch(
    BANNER_API.UPDATE_BANNER_HIDDEN.replace(":id", id),
    data,
    { baseURL: "http://localhost:3001" }
  );
};

