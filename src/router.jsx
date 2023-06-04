import {Layout} from "antd";
import Products from "./pages/Products/index.jsx";
import Categories from "./pages/Categories/index.jsx";
import Banner from "./pages/Banner/index.jsx";
import Users from "./pages/Users/index.jsx";
import Orders from "./pages/Orders/index.jsx";
import Payments from "./pages/Payments/index.jsx";

export const ROUTER = [
  {
    path: '/',
    element: <Layout />,
  },
  {
    path: '/products',
    element:  <Products />,
  },
  {
    path: '/categories',
    element:  <Categories />,
  },
  {
    path: '/banner',
    element:  <Banner />,
  },
  {
    path: '/users',
    element:  <Users />,
  },
  {
    path: '/orders',
    element:  <Orders />,
  },
  {
    path: '/payments',
    element:  <Payments />,
  },
]