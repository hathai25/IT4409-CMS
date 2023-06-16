import {instanceCoreApi} from "./setupAxios.js";
import {SHOP_API} from "./apis/index.js";

export const getAllProducts = async () => {
  return instanceCoreApi.get(SHOP_API.GET_LIST_PRODUCT);
}

export const getProductById = async (id) => {
  return instanceCoreApi.get(SHOP_API.GET_PRODUCT_DETAIL.replace(':id', id))
}

export const createProduct = async (data) => {
  return instanceCoreApi.post(SHOP_API.CREATE_PRODUCT, data)
}
export const getProductAttributes = async (id) => {
  return instanceCoreApi.get(SHOP_API.GET_PRODUCT_ATTRIBUTES.replace(':id', id))
}