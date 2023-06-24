import {instanceCoreApi} from "./setupAxios.js";
import {CATEGORY_API, SHOP_API} from "./apis/index.js";

export const getAllCategories = async () => {
  return instanceCoreApi.get(CATEGORY_API.GET_ALL_CATEGORIES);
}

export const createCategory = async (category) => {
  return instanceCoreApi.post(CATEGORY_API.GET_ALL_CATEGORIES, category);
}

export const updateCategory = async (id, category) => {
  return instanceCoreApi.patch(CATEGORY_API.UPDATE_CATEGORY.replace(':id', id), category);
}

export const deleteCategory = async (id) => {
  return instanceCoreApi.patch(CATEGORY_API.DELETE_CATEGORY.replace(':id', id));
}