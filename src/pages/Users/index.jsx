import {Button, Col, Image, Input, notification, Row, Select, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {getAllProducts} from "../../services/product.service.js";
import {formatCurrency} from "../../utils/string.js";
import {DeleteFilled, EditFilled, PlusOutlined} from "@ant-design/icons";
import {EditIcon} from "../../assets/Icons/EditIcon.jsx";
import {DeleteIcon} from "../../assets/Icons/DeleteIcon.jsx";
import DeleteModal from "../../components/Modal/DeleteModal/index.jsx";
import EditProductForm from "./EditUserForm/index.jsx";
import {LockIcon} from "../../assets/Icons/LockIcon.jsx";
import {UnlockIcon} from "../../assets/Icons/UnlockIcon.jsx";
import LockModal from "../../components/Modal/LockModal/index.jsx";
import UnlockModal from "../../components/Modal/UnlockModal/index.jsx";
import EditUserForm from "./EditUserForm/index.jsx";

const Users = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
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

  const handleDelete = () => {
    console.log('ok')
    setShowDeleteModal(false)
    fetchProducts()
  }

  const handleLock = () => {
    console.log('ok')
    setShowLockModal(false)
    fetchProducts()
  }

  const handleUnlock = () => {
    console.log('ok')
    setShowUnlockModal(false)
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
        <Col span={12} style={{display: "flex"}}>
          <Button
            style={{marginLeft: 'auto', color: '#ffffff', backgroundColor: '#0c3b70'}}
            size={"large"}
            type="primary"
            onClick={() => {
              setIsEdit(false)
              setShowEditModal(true)
            }}
          >
            New <PlusOutlined/>
          </Button>
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
            title: "Username",
            dataIndex: "title",
            key: "title",
            width: 100,
          },
          {
            title: "Status",
            dataIndex: "stock",
            key: "quantity",
            width: 50,
            //render tag
            render: (value) => {
              if (value > 0) {
                return <Tag color="green">Active</Tag>
              } else {
                return <Tag color="red">Locked</Tag>
              }
            }
          },
          {
            title: "Avatar",
            dataIndex: "thumbnail",
            key: "thumbnail",
            width: 100,
            render: (value) => <Image src={value} width={160} height={90}/>
          },
          {
            title: "Phone",
            dataIndex: "description",
            key: "description",
            width: 300,
          },
          {
            title: "Address",
            dataIndex: "price",
            key: "price",
            width: 100,
            render: (value) => formatCurrency(value)
          },
          {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            align: 'right',
            width: 100,
            render: (text, record) => <>
              {record?.stock > 0 ?
                <>
                  <span style={{cursor: "pointer"}} onClick={() => {
                    setIsEdit(true)
                    setShowEditModal(true)
                    setRowData(record)
                  }}><EditIcon style={{marginRight: 8}}/></span>
                  <span style={{cursor: "pointer"}} onClick={() => setShowLockModal(true)}><LockIcon/></span>
                </>
                :
                <>
                  <span style={{cursor: "pointer"}} onClick={() => setShowDeleteModal(true)}><DeleteIcon style={{marginRight: 8}}/></span>
                  <span style={{cursor: "pointer"}} onClick={() => setShowUnlockModal(true)}><UnlockIcon/></span>
                </>
              }
            </>,
          },
        ]}
        pagination={{
          pageSize: 5,
        }}
      />
      <EditUserForm
        isEdit={isEdit}
        data={isEdit ? rowData : null}
        visible={showEditModal}
        handleSubmit={handleEdit}
        handleCancel={() => {
          console.log('cancel')
          setShowEditModal(false)
        }}
      />
      <DeleteModal
        show={showDeleteModal}
        title={"Delete user"}
        content={"Are you sure you want to delete this user?"}
        handleDelete={handleDelete}
        handleCancel={() => {
          console.log('cancel')
          setShowDeleteModal(false)
        }}
      />
      <LockModal
        show={showLockModal}
        title={"Lock user"}
        content={"Are you sure you want to lock this user?"}
        handleDelete={handleLock}
        handleCancel={() => {
          console.log('cancel')
          setShowLockModal(false)
        }}
      />
      <UnlockModal
        show={showUnlockModal}
        title={"Unlock user"}
        content={"Are you sure you want to unlock this user?"}
        handleDelete={handleUnlock}
        handleCancel={() => {
          console.log('cancel')
          setShowUnlockModal(false)
        }}
      />
    </div>
  )
}

export default Users