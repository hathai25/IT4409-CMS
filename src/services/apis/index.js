export const SHOP_API = {
  GET_LIST_PRODUCT: '/products',
  GET_PRODUCT_DETAIL: '/products/:id',
  CREATE_PRODUCT: '/products',
  GET_PRODUCT_ATTRIBUTES: '/product-details/:id',
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