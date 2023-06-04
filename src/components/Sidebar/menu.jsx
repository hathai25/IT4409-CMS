import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined, ShoppingCartOutlined,
  UserOutlined, WalletOutlined
} from "@ant-design/icons";

export const MENU = [
  {
    key: 'products',
    icon: <PieChartOutlined />,
    children: null,
    label: 'Quản lý sản phẩm',
    type: null
  },
  {
    key: 'categories',
    icon: <DesktopOutlined />,
    children: null,
    label: 'Quản lý danh mục',
    type: null,
  },
  {
    key: 'banner',
    icon: <ContainerOutlined />,
    children: null,
    label: 'Quản lý banner',
    type: null,
  },
  {
    key: 'users',
    icon: <UserOutlined />,
    children: null,
    label: 'Quản lý người dùng',
    type: null,
  },
  {
    key: 'orders',
    icon: <ShoppingCartOutlined />,
    children: null,
    label: 'Quản lý đơn hàng',
    type: null,
  },
  {
    key: 'payments',
    icon: <WalletOutlined />,
    children: null,
    label: 'Quản lý thanh toán',
    type: null,
  },
  {
    label: 'Navigation Two',
    path: '/dashboard',
    icon: <AppstoreOutlined />,
    key: 'z',
    children: [
      {
        label: 'Option 9',
        path: '/dashboard',
        key: '9',
        element: <></>
      },
      {
        label: 'Option 10',
        path: '/dashboard',
        key: '10',
        element: <></>
      },
      {
        label: 'Submenu',
        path: '/dashboard',
        key: '11',
        element: <></>,
        children: [
          {
            label: 'Option 11',
            path: '/dashboard',
            key: '11',
            element: <></>
          },
          {
            label: 'Option 12',
            path: '/dashboard',
            key: '12',
            element: <></>
          }
        ]
      },
    ],
    element: <></>
  },
]