import {Button, Col, Image, Input, notification, Row, Select, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {EditIcon} from "../../assets/Icons/EditIcon.jsx";
import {DeleteIcon} from "../../assets/Icons/DeleteIcon.jsx";
import DeleteModal from "../../components/Modal/DeleteModal/index.jsx";
import {LockIcon} from "../../assets/Icons/LockIcon.jsx";
import {UnlockIcon} from "../../assets/Icons/UnlockIcon.jsx";
import LockModal from "../../components/Modal/LockModal/index.jsx";
import UnlockModal from "../../components/Modal/UnlockModal/index.jsx";
import {deleteUserInfo, getAllUser} from "../../services/user.service.js";
import EditAdminForm from "./EditAdminForm/index.jsx";
import {
  createAdmin,
  deleteAdmin,
  getAdminList,
  lockAdmin,
  unlockAdmin,
  updateAdmin
} from "../../services/admin.service.js";

const Admin = () => {
  const [admin, setAdmin] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const initialValue = {
    email: "",
    password: "",
    roles: []
  }

  const fetchAdmin = () => {
    try {
      getAdminList().then((res) => {
        console.log({res})
        setAdmin(res?.data?.data?.items)
      })
      console.log("fetched")
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't get users"
      })
    }
  }

  const handleAdd = (data) => {
    try {
      createAdmin(data).then((res) => {
        if (res?.status === 201) {
          notification.success({
            message: "Success",
            description: "Created successfully"
          })
          fetchAdmin()
          setShowEditModal(false)
        } else {
          notification.error({
            message: "Error",
            description: "Can't create admin"
          })
        }
      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't create admin"
      })
    }
  }

  const handleEdit = (data) => {
    try {
      updateAdmin(rowData?.id, data).then((res) => {
        if (res?.status === 200) {
          notification.success({
            message: "Success",
            description: "Created successfully"
          })
          fetchAdmin()
          setShowEditModal(false)
        } else {
          notification.error({
            message: "Error",
            description: "Can't update admin"
          })
        }
      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't update admin"
      })
    }
  }

  const handleDelete = () => {
    try {
      deleteAdmin(rowData?.id).then((res) => {
        console.log({res})
        if (res?.status === 200) {
          notification.success({
            message: "Success",
            description: "Deleted successfully"
          })
          setShowDeleteModal(false)
          fetchAdmin()
        } else {
          notification.error({
            message: "Error",
            description: "Can't delete user"
          })
        }

      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't delete user"
      })
      setShowDeleteModal(false)
    }
  }

  const handleLock = () => {
    try {
      lockAdmin(rowData?.id).then((res) => {
        if (res?.status === 200) {
          notification.success({
            message: "Success",
            description: "Locked successfully"
          })
          fetchAdmin()
          setShowLockModal(false)
        } else {
          notification.error({
            message: "Error",
            description: "Can't lock admin"
          })
        }
      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't lock admin"
      })
    }
  }

  const handleUnlock = () => {
    try {
      unlockAdmin(rowData?.id).then((res) => {
        if (res?.status === 200) {
          notification.success({
            message: "Success",
            description: "Unlocked successfully"
          })
          fetchAdmin()
          setShowLockModal(false)
        } else {
          notification.error({
            message: "Error",
            description: "Can't unlock admin"
          })
        }
      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't unlock admin"
      })
    }
  }


  useEffect(() => {
    fetchAdmin()
  }, [])

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filteredDataSource = admin.filter((item) =>
      item.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredDataSource);
  };

  return (
    <div>
      <Row justify={"space-between"} style={{margin: "2rem 0"}}>
        <Col span={12}>
          <Input
            placeholder="Search by email"
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
              setRowData(initialValue)
              setShowEditModal(true)
            }}
          >
            New <PlusOutlined/>
          </Button>
        </Col>
      </Row>

      <Table
        dataSource={filteredData.length >= 0 && searchText !== '' ? filteredData : admin}
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
            title: "Email",
            dataIndex: "email",
            key: "emails",
            width: 200,
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 50,
            //render tag
            render: (value) => {
              if (!value) {
                return <Tag color="green">Active</Tag>
              } else {
                return <Tag color="red">Locked</Tag>
              }
            }
          },
          {
            title: "Roles",
            dataIndex: "roles",
            key: "roles",
            width: 200,
            render: (value) => value?.map((item) => <Tag key={Math.random()}
                                                         color={item === "super admin" ? "purple" : (
                                                           item === "admin" ? "blue" : item === "manage page" ? "green" : item === "manage product" ? "orange" : "red"
                                                         )}>{item}</Tag>)
          },
          {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 200,
            render: (value) => <span style={{color: 'grey'}}>{new Date(value).toLocaleString()}</span>
          },
          {
            title: "Updated At",
            dataIndex: "updatedAt",
            key: "updatedAt",
            width: 200,
            render: (value) => <span style={{color: 'grey'}}>{new Date(value).toLocaleString()}</span>
          },
          {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            align: 'right',
            width: 100,
            render: (text, record) => <>
              {!record?.deleted ?
                <>
                  <span style={{cursor: "pointer"}} onClick={() => {
                    setIsEdit(true)
                    setShowEditModal(true)
                    setRowData(record)
                  }}><EditIcon style={{marginRight: 8}}/></span>
                  <span style={{cursor: "pointer"}} onClick={() => {
                    setShowLockModal(true)
                    setRowData(record)
                  }}><LockIcon/></span>
                </>
                :
                <>
                  <span style={{cursor: "pointer"}} onClick={() => {
                    setShowDeleteModal(true)
                    setRowData(record)
                  }}>
                    <DeleteIcon style={{marginRight: 8}}/>
                  </span>
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
      <EditAdminForm
        isEdit={isEdit}
        data={rowData}
        visible={showEditModal}
        handleSubmit={isEdit ? handleEdit : handleAdd}
        handleCancel={() => {
          setShowEditModal(false)
        }}
      />
      <DeleteModal
        show={showDeleteModal}
        title={"Delete user"}
        content={"Are you sure you want to delete this user?"}
        handleDelete={handleDelete}
        handleCancel={() => {
          setShowDeleteModal(false)
        }}
      />
      <LockModal
        show={showLockModal}
        title={"Lock user"}
        content={"Are you sure you want to lock this user?"}
        handleDelete={handleLock}
        handleCancel={() => {
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

export default Admin