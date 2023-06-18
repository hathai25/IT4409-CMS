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
export const getProductDefaultAttributes = async (id) => {
  return instanceCoreApi.get(SHOP_API.GET_PRODUCT_DEFAULT_ATTRIBUTES, {
    params: {
      productDetailId: id
    }
  })
}

export const createProductDefaultAttributes = async (data) => {
  return instanceCoreApi.post(SHOP_API.GET_PRODUCT_DEFAULT_ATTRIBUTES, data)
}

export const editProductDefaultAttributes = async (id, data) => {
  return instanceCoreApi.patch(SHOP_API.UPDATE_PRODUCT_DEFAULT_ATTRIBUTES.replace(':id', id), data)
}

export const deleteProductDefaultAttributes = async (id) => {
  return instanceCoreApi.delete(SHOP_API.UPDATE_PRODUCT_DEFAULT_ATTRIBUTES.replace(':id', id))
}

export const deleteProduct = async (id) => {
  return instanceCoreApi.patch(SHOP_API.DELETE_PRODUCT.replace(':id', id))
}

export const updateProduct = async (id, data) => {
  return instanceCoreApi.patch(SHOP_API.UPDATE_PRODUCT.replace(':id', id), data)
}

export const updateProductDetails = async (id, data) => {
  return instanceCoreApi.patch(SHOP_API.UPDATE_PRODUCT_DETAILS.replace(':id', id), data)
}

export const getAllOtherAttributes = async () => {
  return instanceCoreApi.get(SHOP_API.CREATE_PRODUCT_OTHER_ATTRIBUTES)
}

export const getAllOtherAttributesValues = async (id) => {
  return instanceCoreApi.get(SHOP_API.CREATE_PRODUCT_OTHER_ATTRIBUTES_VALUES, {
    params: {
      productDetailId: id
    }
  })
}
export const createProductOtherAttributes = async (data) => {
  return instanceCoreApi.post(SHOP_API.CREATE_PRODUCT_OTHER_ATTRIBUTES, data)
}

export const createProductOtherAttributesValues = async (data) => {
  return instanceCoreApi.post(SHOP_API.CREATE_PRODUCT_OTHER_ATTRIBUTES_VALUES, data)
}

export const updateProductOtherAttributes = async (id, data) => {
  return instanceCoreApi.patch(SHOP_API.UPDATE_PRODUCT_OTHER_ATTRIBUTES.replace(':id', id), data)
}

export const updateProductOtherAttributesValues = async (id, data) => {
  return instanceCoreApi.patch(SHOP_API.UPDATE_PRODUCT_OTHER_ATTRIBUTES_VALUES.replace(':id', id), data)
}

export const deleteProductOtherAttributesValues = async (id) => {
  return instanceCoreApi.delete(SHOP_API.UPDATE_PRODUCT_OTHER_ATTRIBUTES_VALUES.replace(':id', id))
}

export const getProductMedia = async (id) => {
  return instanceCoreApi.get(SHOP_API.GET_PRODUCT_MEDIA, {
    params: {
      productDetailId: id
    }
  })
}