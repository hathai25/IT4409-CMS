import {Layout} from "antd";
import Products from "./pages/Products/index.jsx";
import Categories from "./pages/Categories/index.jsx";
import Banner from "./pages/Banner/index.jsx";
import Users from "./pages/Users/index.jsx";
import Orders from "./pages/Orders/index.jsx";
import Payments from "./pages/Payments/index.jsx";
import ProductDetail from "./pages/Products/ProductDetail/index.jsx";
import Admin from "./pages/Admin/index.jsx";
import Login from "./pages/Login/index.jsx";

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
    path: '/products/:id',
    element: <ProductDetail />,
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
  {
    path: '/admin',
    element:  <Admin />,
  },
]