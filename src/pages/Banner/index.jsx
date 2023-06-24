import {Button, Col, Image, Input, notification, Row, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {EditIcon} from "../../assets/Icons/EditIcon.jsx";
import {DeleteIcon} from "../../assets/Icons/DeleteIcon.jsx";
import DeleteModal from "../../components/Modal/DeleteModal/index.jsx";
import {PlusOutlined} from "@ant-design/icons";
import {formatTime} from "../../utils/string.js";
import {addBanner, deleteBanner, getAllBanner, hideBanner, updateBanner} from "../../services/banner.service.js";
import EditBannerForm from "./EditBannerForm/index.jsx";
import {LockIcon} from "../../assets/Icons/LockIcon.jsx";
import {UnlockIcon} from "../../assets/Icons/UnlockIcon.jsx";
import LockModal from "../../components/Modal/LockModal/index.jsx";
import UnlockModal from "../../components/Modal/UnlockModal/index.jsx";
import useCallApi from "../../../hooks/useCallApi.js";
import Spinner from "../../components/Spinner/index.jsx";

const Banner = () => {
  const [banner, setBanner] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showHideModal, setShowHideModal] = useState(false);
  const [showShowModal, setShowShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const initialFormValues = {
    url: "",
    description: "",
  }

  const { send: fetchBanners, loading } = useCallApi({
    callApi: getAllBanner,
    success: (res) => {
      setBanner(res?.data?.items)
    },
    error: () => {
      notification.error({
        message: "Error",
        description: "Can't get banners"
      })
    }
  })

  const handleAdd = (data) => {
    try {
      addBanner(data).then((res) => {
        if (res?.status === 201) {
          notification.success({
            message: "Success",
            description: "Banner added successfully"
          })
          fetchBanners()
          setShowEditModal(false)
        } else {
          notification.error({
            message: "Error",
            description: "Can't add banner"
          })
        }
      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't get banners"
      })
    }
  }

  const handleEdit = (data) => {
    try {
      updateBanner(rowData?.id, data).then((res) => {
        if (res?.status === 200) {
          notification.success({
            message: "Success",
            description: "Banner updated successfully"
          })
          fetchBanners()
          setShowEditModal(false)
        } else {
          notification.error({
            message: "Error",
            description: "Can't update banner"
          })
        }
      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't update banners"
      })
    }
  }

  const handleDelete = () => {
    try {
      deleteBanner(rowData?.id).then((res) => {
        if (res?.status === 200) {
          notification.success({
            message: "Success",
            description: "Banner deleted successfully"
          })
          fetchBanners()
          setShowDeleteModal(false)
        } else {
          notification.error({
            message: "Error",
            description: "Can't delete banner"
          })
        }
      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't delete banners"
      })
    }
  }

  const handleHide = () => {
    try {
      hideBanner(rowData?.id, {isShow: false}).then((res) => {
        if (res?.status === 200) {
          notification.success({
            message: "Success",
            description: "Banner hided successfully"
          })
          fetchBanners()
          setShowHideModal(false)
        } else {
          notification.error({
            message: "Error",
            description: "Can't hide banner"
          })
        }
      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't hide banners"
      })
    }
  }
  const handleShow = () => {
    try {
      hideBanner(rowData?.id, {isShow: true}).then((res) => {
        if (res?.status === 200) {
          notification.success({
            message: "Success",
            description: "Banner showed successfully"
          })
          fetchBanners()
          setShowShowModal(false)
        } else {
          notification.error({
            message: "Error",
            description: "Can't show banner"
          })
        }
      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't show banners"
      })
    }
  }

  useEffect(() => {
    fetchBanners()
  }, [])

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const filteredDataSource = banner.filter((item) =>
      item.description?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filteredDataSource);
  };

  console.log({filteredData})

  return (
    <div>
      {loading ? <Spinner/> : (
        <>
            <Row justify={"space-between"} style={{margin: "2rem 0"}}>
              <Col span={12}>
                <Input
                  placeholder="Search by description"
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
                    setRowData(initialFormValues)
                    setShowEditModal(true)
                  }}
                >
                  New <PlusOutlined/>
                </Button>
              </Col>
            </Row>

            <Table
              dataSource={filteredData.length >= 0 && searchText !== '' ? filteredData : banner}
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
                  title: "Image",
                  dataIndex: "url",
                  key: "url",
                  width: 100,
                  render: (value) => <Image src={value} width={160} height={90}/>
                },
                {
                  title: "Status",
                  dataIndex: "isShow",
                  key: "url",
                  width: 100,
                  render: (value) => <Tag color={value ? "green" : "red"}>{value ? 'Show' : 'Hide'}</Tag>
                },
                {
                  title: "Description",
                  dataIndex: "description",
                  key: "description",
                  width: 300,
                },
                {
                  title: 'Action',
                  key: 'operation',
                  fixed: 'right',
                  align: 'right',
                  width: 50,
                  render: (text, record) => <>
                    {record?.isShow ?
                      <>
                        <span style={{cursor: "pointer"}} onClick={() => {
                          setIsEdit(true)
                          setShowEditModal(true)
                          setRowData(record)
                        }}><EditIcon style={{marginRight: 8}}/></span>
                        <span style={{cursor: "pointer"}} onClick={() => {
                          setShowHideModal(true)
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
                        <span style={{cursor: "pointer"}} onClick={() => {
                          setShowShowModal(true)
                          setRowData(record)
                        }}><UnlockIcon/></span>
                      </>
                    }
                  </>,
                },
              ]}
              pagination={{
                pageSize: 5,
              }}
            />
            <EditBannerForm
              isEdit={isEdit}
              data={rowData}
              visible={showEditModal}
              handleSubmit={isEdit ? handleEdit : handleAdd}
              handleCancel={() => {
                setRowData(null)
                setShowEditModal(false)
              }}
            />
            <DeleteModal
              show={showDeleteModal}
              title={"Delete banner"}
              content={"Are you sure you want to delete this banner?"}
              handleDelete={handleDelete}
              handleCancel={() => {
                setRowData(null)
                setShowDeleteModal(false)
              }}
            />
            <LockModal
              show={showHideModal}
              title={"Lock banner"}
              content={"Are you sure you want to lock this banner?"}
              handleDelete={handleHide}
              handleCancel={() => {
                setShowHideModal(false)
              }}
            />
            <UnlockModal
              show={showShowModal}
              title={"Unlock banner"}
              content={"Are you sure you want to unlock this banner?"}
              handleDelete={handleShow}
              handleCancel={() => {
                setShowShowModal(false)
              }}
            />
        </>
      )}
    </div>
  )
}

export default Banner