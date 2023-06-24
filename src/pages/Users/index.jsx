import {Button, Col, Image, Input, Modal, notification, Row, Select, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {EditIcon} from "../../assets/Icons/EditIcon.jsx";
import {DeleteIcon} from "../../assets/Icons/DeleteIcon.jsx";
import DeleteModal from "../../components/Modal/DeleteModal/index.jsx";
import {LockIcon} from "../../assets/Icons/LockIcon.jsx";
import {UnlockIcon} from "../../assets/Icons/UnlockIcon.jsx";
import LockModal from "../../components/Modal/LockModal/index.jsx";
import UnlockModal from "../../components/Modal/UnlockModal/index.jsx";
import EditUserForm from "./EditUserForm/index.jsx";
import {deleteUserInfo, getAllUser, getUserAddressList, updateUserInfo} from "../../services/user.service.js";
import AddressSelectCard from "./AddressSelectCard/index.jsx";
import useCallApi from "../../../hooks/useCallApi.js";
import Spinner from "../../components/Spinner/index.jsx";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [otherAddressModal, setOtherAddressModal] = useState(false);
  const [addressList, setAddressList] = useState([])
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const { send: fetchUsers, loading } = useCallApi({
    callApi: getAllUser,
    success: (res) => {
      setUsers(res?.data?.items)
    },
    error: () => {
      notification.error({
        message: "Error",
        description: "Can't get users"
      })
    }
  })

  const handleEdit = (data) => {
    try {
      updateUserInfo(rowData?.id, {
        ...data,
        username: data?.email
      }).then((res) => {
        console.log({res})
        if (res?.status === 200) {
          notification.success({
            message: "Success",
            description: "Updated successfully"
          })
          setShowEditModal(false)
          fetchUsers()
        } else {
          notification.error({
            message: "Error",
            description: "Can't update user"
          })
        }

      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't update user"
      })
      setShowDeleteModal(false)
    }
  }

  const handleDelete = () => {
    try {
      deleteUserInfo({id: rowData?.id}).then((res) => {
        console.log({res})
        if (res?.status === 200) {
          notification.success({
            message: "Success",
            description: "Deleted successfully"
          })
            setShowDeleteModal(false)
            fetchUsers()
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
      deleteUserInfo({id: rowData?.id}).then((res) => {
        console.log({res})
        if (res?.status === 200) {
          notification.success({
            message: "Success",
            description: "Deleted successfully"
          })
          setShowDeleteModal(false)
          fetchUsers()
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

  const handleUnlock = () => {
    console.log('ok')
    setShowUnlockModal(false)
    fetchUsers()
  }


  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filteredDataSource = users.filter((item) =>
      item.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredDataSource);
  };

  return (
    <div>
      {loading ? <Spinner/> : (
        <>
          <Row justify={"space-between"} style={{margin: "2rem 0"}}>
            <Col span={12}>
              <Input
                placeholder="Search by email"
                size="large"
                onChange={handleSearch}
              />
            </Col>
            <Col span={12} style={{display: "flex"}}>
            </Col>
          </Row>
          <Table
            dataSource={filteredData.length >= 0 && searchText !== '' ? filteredData : users}
            rowKey={(record) => record?.id}
            scroll={{y: 600}}
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
                dataIndex: "username",
                key: "username",
                width: 100,
              },
              {
                title: "Status",
                dataIndex: "isActivity",
                key: "isActivity",
                width: 100,
                render: (value) => {
                  if (value) {
                    return <Tag color="green">Active</Tag>
                  } else {
                    return <Tag color="red">Locked</Tag>
                  }
                }
              },
              {
                title: "Avatar",
                dataIndex: "avatar",
                key: "avatar",
                width: 200,
                render: (value) => value ? <Image src={value} width={90} height={160}/> : 'No avatar'
              },
              {
                title: "Email",
                dataIndex: "email",
                key: "emails",
                width: 300,
              },
              {
                title: "Phone",
                dataIndex: "phone",
                key: "phone",
                width: 300,
              },
              {
                title: "Address",
                dataIndex: "",
                key: "address",
                width: 100,
                render: (value, record) => <Button type="link" onClick={() => {
                  try {
                    getUserAddressList(record?.id).then((res) => {
                      console.log({res})
                      if (res?.status === 200) {
                        setRowData(res?.data)
                        setOtherAddressModal(true)
                      } else {
                        notification.error({
                          message: "Error",
                          description: "Can't get address"
                        })
                      }
                    })
                  } catch (error) {
                    notification.error({
                      message: "Error",
                      description: "Can't get address"
                    })
                  }
                }}>View</Button>
              },
              {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                align: 'right',
                width: 100,
                render: (text, record) => <>
                    <>
                      <span style={{cursor: "pointer"}} onClick={() => {
                        setIsEdit(true)
                        setShowEditModal(true)
                        setRowData(record)
                      }}><EditIcon style={{marginRight: 8}}/></span>
                      <span style={{cursor: "pointer"}} onClick={() => {
                        setShowDeleteModal(true)
                      }}>
                        <DeleteIcon style={{marginRight: 8}}/>
                      </span>
                    </>
                </>,
              },
            ]}
            pagination={{
              pageSize: 5,
            }}
          />
          <EditUserForm
            isEdit={isEdit}
            data={rowData}
            visible={showEditModal}
            handleSubmit={handleEdit}
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
          <Modal
            title="Use other address"
            open={otherAddressModal}
            onCancel={() => setOtherAddressModal(false)}
            onOk={() => {
              setOtherAddressModal(false)
            }}
          >
            <Row gutter={[16, 16]}>
              {addressList.map((address) => (
                <Col xs={24} md={12}>
                  <AddressSelectCard
                    key={address.id}
                    address={address}
                  />
                </Col>
              ))}
            </Row>
          </Modal>
        </>
      )}
    </div>
  )
}

export default Users