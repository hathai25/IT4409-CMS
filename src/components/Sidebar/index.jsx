import {
  AppstoreOutlined,
  ContainerOutlined, DesktopOutlined, MailOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useState } from 'react';
import "./styles.scss"
import {MENU} from "./menu.jsx";
import {useNavigate} from "react-router-dom";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Option 3', '3', <ContainerOutlined />),
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
];
const Sidebar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <div style={{display: "flex", height: 40}}>
        {!collapsed &&
          <p className="sidebar-logo">CMS</p>
        }
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            width: collapsed ? 80 : '20%',
            borderRadius: 0,
            height: 40,
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <Menu
        selectedKeys={[window.location.pathname.split("/")[1]]}
        mode="inline"
        onClick={(item) => navigate(`/${item.key}`)}
        theme="dark"
        inlineCollapsed={collapsed}
        items={MENU}
        style={{
          height: 'calc(100vh - 40px)',
          borderRight: 0,
        }}
      />
    </div>
  );
};
export default Sidebar;