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
  GET_ALL_USERS: '/users',
  UPDATE_USER: '/users/:id',
  DELETE_USER: '/users/trash/:id',
  GET_USER_ADDRESS: '/users/address/by-admin/:id',
}

export const CATEGORY_API = {
  GET_ALL_CATEGORIES: '/categories',
  UPDATE_CATEGORY: '/categories/:id',
  DELETE_CATEGORY: '/categories/trash/:id',
}

export const BANNER_API = {
  GET_ALL_BANNERS: '/sliders/management',
  ADD_BANNER: '/sliders',
  UPDATE_BANNER: '/sliders/:id',
  HIDE_BANNER: '/sliders/show/:id',
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

export const ADMIN_API = {
  GET_ALL_ADMIN: '/admin',
  CREATE_ADMIN: '/admin/create',
  UPDATE_ADMIN: '/admin/:id',
  LOCK_ADMIN: '/admin/delete/:id',
  UNLOCK_ADMIN: '/admin/restore/:id',
  DELETE_ADMIN: '/admin/destroy/:id',
  GET_DELETED_ADMIN: '/admin/trash',
}