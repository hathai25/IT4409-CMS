import "./style.scss"
import {Breadcrumb, Col, notification, Row} from "antd";
import Sidebar from "../../components/Sidebar/index.jsx";
import {useLocation} from "react-router-dom";
import {MAP_PATHNAME_TO_BREADCRUMB} from "../../constants.js";
import {LogoutOutlined} from "@ant-design/icons";
import {useEffect} from "react";
import Login from "../Login/index.jsx";

const Layout = ({children}) => {
  const {pathname} = useLocation();

  const breadCrumbItems = [
    {title: "Home", href: "/"},
    ...MAP_PATHNAME_TO_BREADCRUMB.filter(item => item.href === pathname)
  ]

  const token = localStorage.getItem("admin_token");
  const isValidToken = token => {
    if (!token) return false;
    const payload = token?.split(".")[1];
    const decodedPayload = atob(payload);
    const {exp} = JSON.parse(decodedPayload);
    return Date.now() <= exp*1000;
  }

  return (
    isValidToken(token) ? (
      <Row>
        <Col xs={3}>
          <Sidebar/>
        </Col>
        <Col xs={21}>
          <div style={{
            height: 40,
            backgroundColor: "#fff",
            boxShadow: "0 3px 4px rgba(0,21,41,.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}>
            <span onClick={() => {
              localStorage.removeItem("admin_token");
              window.location.href = "/";
              notification.success({
                message: "Success",
                description: "Logout success!"
              })
            }}>
              <LogoutOutlined style={{fontSize: 20, marginRight: 10, color: "grey", cursor: "pointer"}}/>
            </span>
          </div>
          <div style={{padding: "2rem", maxHeight: "100vh"}}>
            {pathname !== "/" && (
              <Breadcrumb
                separator={"/"}
                items={breadCrumbItems}
                style={{marginBottom: 16, fontSize: 16}}
              />
            )}
            {children}
          </div>
        </Col>
      </Row>
    ) : (
      <Login/>
    ))
}

export default Layout
