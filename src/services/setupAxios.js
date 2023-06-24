import axios from 'axios';
import {notification} from "antd";
import {useNavigate} from "react-router-dom";

const CORE_API = import.meta.env.VITE_PUBLIC_API_BASE_URL;

axios.defaults.headers.common['Accept'] = 'application/json';

const addInterceptor = (instant) => {
  instant.interceptors.request.use(
    (config) => {
      if (!config?.headers?.Authorization) {
        const token = localStorage.getItem('admin_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          config.headers.Authorization = '';
        }
      }
      return config;
    },
    (err) => Promise.reject(err),
  );

  instant.interceptors.response.use(
    async (response) => {
      const {code} = response
      if (code === 401 || (code === 500 && !response.config.headers.Authorization)) {
        notification.error({
          message: 'Phiên đăng nhập hết hạn',
          description: 'Vui lòng đăng nhập lại',
        })
        localStorage.removeItem('admin_token')
      }
      return response;
    },
    (err) => {
        console.log('err', err)
      if (err.response?.status === 403) {
        const token = localStorage.getItem('admin_token');
        if (token) {
          notification.error({
            message: 'Error',
            description: 'No permission',
          })
        }
      } else if (err.response?.status === 401) {
        window.location.href = '/login'
        localStorage.removeItem('admin_token')
        notification.error({
          message: 'Phiên đăng nhập hết hạn',
          description: 'Vui lòng đăng nhập lại',
        })
      }
      return Promise.reject(err)
    }
  )

  return instant
}

const createInstance = (api) => {
  const instant = axios.create({
    baseURL: api,
  });

  addInterceptor(instant);

  return instant;
}

export const instanceCoreApi = createInstance(CORE_API);

export default function setupAxiosDefault() {
  axios.defaults.baseURL = CORE_API;
  addInterceptor(axios);
}