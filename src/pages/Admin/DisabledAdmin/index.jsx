import {Col, Input, notification, Row, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {DeleteIcon} from "../../../assets/Icons/DeleteIcon.jsx";
import DeleteModal from "../../../components/Modal/DeleteModal/index.jsx";
import {UnlockIcon} from "../../../assets/Icons/UnlockIcon.jsx";
import UnlockModal from "../../../components/Modal/UnlockModal/index.jsx";
import {deleteAdmin, getDeletedAdminList, unlockAdmin} from "../../../services/admin.service.js";
import useCallApi from "../../../../hooks/useCallApi.js";
import Spinner from "../../../components/Spinner/index.jsx";

const DisabledAdmin = ({flag, setFlag}) => {
  const [admin, setAdmin] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [rowData, setRowData] = useState(null);

  const { send: fetchAdmin, loading } = useCallApi({
    callApi: getDeletedAdminList,
    success: (res) => {
      setAdmin(res?.data?.items)
    },
    error: () => {
      notification.error({
        message: "Error",
        description: "Can't get admin"
      })
    }
  })

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

  const handleUnlock = () => {
    try {
      unlockAdmin(rowData?.id).then((res) => {
        if (res?.status === 200) {
          notification.success({
            message: "Success",
            description: "Unlocked successfully"
          })
          setFlag(!flag)
          fetchAdmin()
          setShowUnlockModal(false)
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
  }, [flag])

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
                  <>
                      <span style={{cursor: "pointer"}} onClick={() => {
                        setShowDeleteModal(true)
                        setRowData(record)
                      }}>
                        <DeleteIcon style={{marginRight: 8}}/>
                      </span>
                    <span style={{cursor: "pointer"}} onClick={() => {
                      setShowUnlockModal(true)
                      setRowData(record)
                    }}><UnlockIcon/></span>
                  </>
                </>,
              },
            ]}
            pagination={{
              pageSize: 5,
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
        </>
      )}
    </div>
  )
}

export default DisabledAdmin