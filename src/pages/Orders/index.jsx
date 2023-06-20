import {Col, Input, notification, Row, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {getAllProducts} from "../../services/product.service.js";
import {EditIcon} from "../../assets/Icons/EditIcon.jsx";
import EditOrderForm from "./EditOrderForm/index.jsx";
import BaseModal from "../../components/Modal/BaseModal/index.jsx";
import {RiseIcon} from "../../assets/Icons/RiseIcon.jsx";
import {cancelOrder, getAllOrders, updateOrderStatus} from "../../services/order.service.js";
import {formatCurrency} from "../../utils/string.js";
import {InfoIcon} from "../../assets/Icons/InfoIcon.jsx";
import OrderDetailModal from "./OrderDetailModal/index.jsx";
import {DeleteIcon} from "../../assets/Icons/DeleteIcon.jsx";
import DeleteModal from "../../components/Modal/DeleteModal/index.jsx";
import {CancelIcon} from "../../assets/Icons/CancelIcon.jsx";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [rowData, setRowData] = useState(null);

  const fetchOrders = () => {
    try {
      getAllOrders().then((res) => {
        setOrders(res?.data?.data?.items)
      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't get orders"
      })
    }
  }

  const handleCancel = () => {
    try {
      cancelOrder(rowData?.id).then(res => {
        if (res?.status === 200) {
          notification.success({
            message: "Success",
            description: "Cancel order successfully!"
          })
          setShowCancelModal(false)
          fetchOrders()
        } else {
          notification.error({
            message: "Error",
            description: "Cancel order failed!"
          })
        }
      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Cancel order failed!"
      })
    }
  }

  const handleProcess = () => {
    try {
      const status = rowData?.status === "Prepared" ? "Delivering" : (rowData?.status === "Delivering" ? "Delivered" : (
        rowData?.status === "Received" ? "Success" : "Prepared"
      ))
      updateOrderStatus(rowData?.id, status).then(res => {
        if (res?.status === 200) {
          notification.success({
            message: "Success",
            description: "Process order successfully!"
          })
          setShowProcessModal(false)
          fetchOrders()
        } else {
          notification.error({
            message: "Error",
            description: "Process order failed!"
          })
        }
      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Process order failed!"
      })
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);


    const filteredDataSource = orders.filter((item) =>
      item.status.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filteredDataSource);
    console.log(filteredData)
  };

  return (
    <div>
      <Row justify={"space-between"} style={{margin: "2rem 0"}}>
        <Col span={12}>
          <Input
            placeholder="Search by status"
            size="large"
            onChange={handleSearch}
          />
        </Col>
      </Row>

      <Table
        dataSource={filteredData.length >= 0 && searchText !== '' ? filteredData : orders}
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
            title: "Owner",
            dataIndex: "owerId",
            key: "owerId",
            width: 100,
            render: (value) => <span style={{color: 'grey'}}>{value?.email} - {value?.phone}</span>
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 50,
            render: (value) => {
              if (value === 'Prepared') {
                return <Tag color="orange">Prepared</Tag>
              } else if (value === 'Delivering') {
                return <Tag color="blue">Delivering</Tag>
              } else if (value === 'Delivered') {
                return <Tag color="yellow">Delivered</Tag>
              } else if (value === 'Received') {
                return <Tag color="green">Received</Tag>
              } else {
                return <Tag color="red">Cancelled</Tag>
              }
            }
          },
          {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 200,
            render: (value) => <span style={{color: 'grey'}}>{new Date(value).toLocaleString()}</span>
          },
          {
            title: "Last Updated",
            dataIndex: "updatedAt",
            key: "updatedAt",
            width: 200,
            render: (value) => <span style={{color: 'grey'}}>{new Date(value).toLocaleString()}</span>
          },
          {
            title: "Total Money",
            dataIndex: "totalMoney",
            key: "totalMoney",
            width: 100,
            render: (value) => <span style={{color: '#1677FF'}}>{formatCurrency(value)}</span>
          },
          {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            align: 'right',
            width: 100,
            render: (text, record) => <>
                <>
                  <span
                    style={{cursor: "pointer"}}
                    onClick={() => {
                      setShowDetailModal(true)
                      setRowData(record)
                    }}
                  >
                    <InfoIcon style={{marginRight: 8}}/>
                  </span>
                  {record?.status === "Prepared" &&
                  <span style={{cursor: "pointer"}} onClick={() => {
                    setShowCancelModal(true)
                    setRowData(record)
                  }}><CancelIcon style={{marginRight: 8}}/></span>}
                  {record?.status !== "Delivered" && record?.status !== "Received" && record?.status !== "Failure" && <span style={{
                    cursor: "pointer", color: record?.status === "Prepared" ? "orange" : (
                      record?.status === "Delivering" ? "blue" : "green" + "!important"
                    )
                  }} onClick={() => {
                    setShowProcessModal(true)
                    setRowData(record)
                  }}>
                    <RiseIcon/>
                  </span>}
                </>
            </>,
          },
        ]}
        pagination={{
          pageSize: 5,
        }}
      />
      <BaseModal
        show={showCancelModal}
        title={"Cancel Order"}
        content={"Are you sure you want to cancel this order?"}
        handleOk={handleCancel}
        handleCancel={() => {
          setShowCancelModal(false)
        }}
      />
      <BaseModal
        show={showProcessModal}
        title={"Process Order"}
        content={"Are you sure you want to process this order?"}
        handleOk={handleProcess}
        handleCancel={() => {
          setShowProcessModal(false)
        }}
      />
      <OrderDetailModal
        showModal={showDetailModal}
        handleCancel={() => setShowDetailModal(false)}
        order_id={rowData?.id}
      />
    </div>
  )
}

export default Orders