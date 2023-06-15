export const SHOP_API = {
  GET_LIST_PRODUCT: '/products',
  GET_PRODUCT_DETAIL: '/products/:id',
}

export const USER_API = {
  GET_ALL_USERS: '/users/get-all',
  DELETE_USER: '/users/trash/:id',
}

export const CATEGORY_API = {
  GET_ALL_CATEGORIES: '/categories',
  UPDATE_CATEGORY: '/categories/:id',
  DELETE_CATEGORY: '/categories/trash/:id',
}

export const BANNER_API = {
  GET_ALL_BANNERS: "/sliders",
  ADD_BANNER: "/sliders",
  UPDATE_BANNER: "/sliders/:id",
  DELETE_BANNER: "/sliders/:id",
  UPDATE_BANNER_SHOW: "/sliders/:id",
  UPDATE_BANNER_HIDDEN: "/sliders/:id",
};