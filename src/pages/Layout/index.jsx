import "./style.scss"
import {Breadcrumb, Col, notification, Row} from "antd";
import Sidebar from "../../components/Sidebar/index.jsx";
import {useLocation} from "react-router-dom";
import {MAP_PATHNAME_TO_BREADCRUMB} from "../../constants.js";

const Layout = ({children}) => {
  const {pathname} = useLocation();

  const breadCrumbItems = [
    {title: "Home", href: "/"},
    ...MAP_PATHNAME_TO_BREADCRUMB.filter(item => item.href === pathname)
  ]

  return (
    <Row>
      <Col xs={3}>
        <Sidebar/>
      </Col>
      <Col xs={21}>
        <div style={{
          height: 40,
          backgroundColor: "#fff",
          boxShadow: "0 3px 4px rgba(0,21,41,.08)",
        }}>
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
  )
}

export default Layout
