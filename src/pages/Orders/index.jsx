import {Button, Col, Image, Input, notification, Row, Select, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {getAllProducts} from "../../services/product.service.js";
import {formatCurrency} from "../../utils/string.js";
import {DeleteFilled, EditFilled, PlusOutlined, RiseOutlined} from "@ant-design/icons";
import {EditIcon} from "../../assets/Icons/EditIcon.jsx";
import {LockIcon} from "../../assets/Icons/LockIcon.jsx";
import {UnlockIcon} from "../../assets/Icons/UnlockIcon.jsx";
import LockModal from "../../components/Modal/LockModal/index.jsx";
import UnlockModal from "../../components/Modal/UnlockModal/index.jsx";
import EditOrderForm from "./EditOrderForm/index.jsx";
import BaseModal from "../../components/Modal/BaseModal/index.jsx";
import {RiseIcon} from "../../assets/Icons/RiseIcon.jsx";

const Orders = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const fetchProducts = () => {
    try {
      getAllProducts().then((res) => {
        setProducts(res?.data?.products)
      })
      console.log("fetched")
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't get users"
      })
    }
  }

  const handleEdit = (data) => {
    console.log('ok', data)
    setShowEditModal(false)
    fetchProducts()
  }

  const handleProcess = () => {
    console.log('ok')
    setShowProcessModal(false)
    fetchProducts()
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const filteredDataSource = products.filter((item) =>
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
        dataSource={filteredData.length > 0 ? filteredData : products}
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
              //pending, processing, done
              if (value > 0) {
                return <Tag color="orange">Pending</Tag>
              } else {
                return <Tag color="green">Done</Tag>
              }
            }
          },
          {
            title: "Items",
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
                <>
                  <span style={{cursor: "pointer"}} onClick={() => {
                    setIsEdit(true)
                    setShowEditModal(true)
                    setRowData(record)
                  }}><EditIcon style={{marginRight: 8}}/></span>
                  <span style={{cursor: "pointer"}} onClick={() => setShowProcessModal(true)}><RiseIcon/></span>
                </>
              }
            </>,
          },
        ]}
        pagination={{
          pageSize: 5,
        }}
      />
      <EditOrderForm
        isEdit={isEdit}
        data={rowData}
        visible={showEditModal}
        handleSubmit={handleEdit}
        handleCancel={() => {
          console.log('cancel')
          setShowEditModal(false)
        }}
      />
      <BaseModal
        show={showProcessModal}
        title={"Process Order"}
        content={"Are you sure you want to process this order?"}
        handleDelete={handleProcess}
        handleCancel={() => {
          console.log('cancel')
          setShowProcessModal(false)
        }}
      />
    </div>
  )
}

export default Orders