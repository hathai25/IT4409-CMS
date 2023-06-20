import {Button, Col, Image, Input, notification, Row, Select, Table, Tabs, Tag} from "antd";

import ActiveAdmin from "./ActiveAdmin/index.jsx";
import DisabledAdmin from "./DisabledAdmin/index.jsx";
import {useState} from "react";

const Admin = () => {
  const [flag, setFlag] = useState(false)
  const items = [
    {
      key: '1',
      label: `Active`,
      children: <ActiveAdmin flag={flag} setFlag={setFlag}/>,
    },
    {
      key: '2',
      label: `Disabled`,
      children: <DisabledAdmin flag={flag} setFlag={setFlag}/>,
    },
  ]
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items}/>
    </div>
  )
}

export default Admin