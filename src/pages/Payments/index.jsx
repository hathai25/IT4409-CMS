import {Col, Input, notification, Row, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {getAllProducts} from "../../services/product.service.js";
import {CheckOutlined} from "@ant-design/icons";
import BaseModal from "../../components/Modal/BaseModal/index.jsx";

const Payments = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [rowData, setRowData] = useState(null);

  const fetchProducts = () => {
    try {
      getAllProducts().then((res) => {
        setData(res?.data?.products)
      })
      console.log("fetched")
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't get payments"
      })
    }
  }

  const handleVerify = () => {
    console.log('ok')
    setShowVerifyModal(false)
    fetchProducts()
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const filteredDataSource = data.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filteredDataSource);
  };

  return (
    <div>
      <Row justify={"space-between"} style={{margin: "2rem 0"}}>
        <Col span={12}>
          <Input
            placeholder="Search by title"
            size="large"
            onChange={handleSearch}
          />
        </Col>
      </Row>

      <Table
        dataSource={filteredData.length > 0 ? filteredData : data}
        rowKey={(record) => record?.id}
        columns={[
          {
            title: '#',
            dataIndex: 'key',
            rowScope: 'row',
            render: (text, record, index) => <span style={{color: 'grey'}}>{index + 1}</span>,
            width: 50,
          },
          {
            title: "Order ID",
            dataIndex: "title",
            key: "title",
            width: 100,
          },
          {
            title: "Status",
            dataIndex: "stock",
            key: "quantity",
            width: 50,
            render: (value) => {
              if (value > 0) {
                return <Tag color="orange">Processing</Tag>
              } else {
                return <Tag color="green">Verified</Tag>
              }
            }
          },
          {
            title: "Type",
            dataIndex: "description",
            key: "description",
            width: 300,
          },
          {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            align: 'right',
            width: 100,
            render: (text, record) => <>
              {record?.stock > 0 &&
                <span style={{cursor: "pointer"}} onClick={() => setShowVerifyModal(true)}><CheckOutlined style={{color: 'green'}}/></span>
              }
            </>,
          },
        ]}
        pagination={{
          pageSize: 5,
        }}
      />
      <BaseModal
        show={showVerifyModal}
        title={"Verify payment"}
        content={"Are you sure you want to verify this payment?"}
        handleOk={handleVerify}
        handleCancel={() => {
          console.log('cancel')
          setShowVerifyModal(false)
        }}
      />
    </div>
  )
}

export default Payments