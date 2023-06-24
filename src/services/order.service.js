import {instanceCoreApi} from "./setupAxios.js";
import {ORDER_API} from "./apis/index.js";

export const getAllOrders = async () => {
  return instanceCoreApi.get(ORDER_API.GET_ALL_ORDERS)
}

export const getOrderByDetail = async (id) => {
  console.log({id})
  return instanceCoreApi.get(ORDER_API.GET_ORDER_BY_ID.replace(':id', id));
}

export const updateOrderStatus = async (id, status) => {
  return instanceCoreApi.patch(ORDER_API.UPDATE_ORDER_STATUS.replace(':id', id), {status});
}

export const cancelOrder = async (id) => {
  return instanceCoreApi.patch(ORDER_API.CANCEL_ORDER.replace(':id', id));
}