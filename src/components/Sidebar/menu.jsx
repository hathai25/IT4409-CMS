import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined, ShoppingCartOutlined,
  UserOutlined, UserSwitchOutlined, WalletOutlined
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
    key: 'admin',
    icon: <UserSwitchOutlined />,
    children: null,
    label: 'Quản lý admin',
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
]