export const SHOP_API = {
  GET_LIST_PRODUCT: '/products',
  GET_PRODUCT_DETAIL: '/products/:id',
  CREATE_PRODUCT: '/products',
  UPDATE_PRODUCT_DETAILS: '/product-details/:id',
  GET_PRODUCT_DEFAULT_ATTRIBUTES: '/product-details/default-values',
  UPDATE_PRODUCT_DEFAULT_ATTRIBUTES: '/product-details/default-values/:id',
  UPDATE_PRODUCT: '/products/:id',
  DELETE_PRODUCT: '/products/delete/:id',
  CREATE_PRODUCT_OTHER_ATTRIBUTES: '/product-details/attributes',
  CREATE_PRODUCT_OTHER_ATTRIBUTES_VALUES: '/product-details/values',
  UPDATE_PRODUCT_OTHER_ATTRIBUTES: '/product-details/attributes/:id',
  UPDATE_PRODUCT_OTHER_ATTRIBUTES_VALUES: '/product-details/values/:id',
  GET_PRODUCT_MEDIA: '/product-details/medias',
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
  GET_ALL_BANNERS: '/sliders',
  ADD_BANNER: '/sliders',
  UPDATE_BANNER: '/sliders/:id',
  DELETE_BANNER: '/sliders/:id',
}

export const MEDIA_API = {
  CREATE_MEDIA: '/medias'
}

export const ORDER_API = {
  UPDATE_ORDER_STATUS: '/orders/:id',
  GET_ALL_ORDERS: '/orders/management',
  GET_ORDER_BY_ID: '/orders/management/:id',
  CANCEL_ORDER: '/orders/admin/cancel/:id',
}