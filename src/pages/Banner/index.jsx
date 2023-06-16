import {Button, Col, Image, Input, notification, Row, Table} from "antd";
import {useEffect, useState} from "react";
import {EditIcon} from "../../assets/Icons/EditIcon.jsx";
import {ShowIcon} from "../../assets/Icons/ShowIcon.jsx";
import {HiddenIcon} from "../../assets/Icons/HiddenIcon.jsx";
import {DeleteIcon} from "../../assets/Icons/DeleteIcon.jsx";
import DeleteModal from "../../components/Modal/DeleteModal/index.jsx";
import BannerModal from "../../components/Modal/DeleteModal/index.jsx";
import {PlusOutlined} from "@ant-design/icons";
import {formatTime} from "../../utils/string.js";
import {addBanner, deleteBanner, getAllBanner, updateBanner,updateBannerShow,updateBannerHidden} from "../../services/banner.service.js";
import EditBannerForm from "./EditBannerForm/index.jsx";

const Banner = () => {
  const [banner, setBanner] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showhide, setShowHide] = useState(true);


  const initialFormValues = {
    url: "",
    description: "",
  }

  const fetchBanners = () => {
  try {
      getAllBanner().then((res) => {
        console.log({res})
        setBanner(res?.data?.data)
      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't get banners"
      })
    }
  }

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
  const handleShow = () => {
    try {
      updateBannerShow(rowData?.id).then((res) => {
        if (res?.status === 200) {
          notification.success({
            message: "Success",
            description: "Banner successfully"
          })
          fetchBanners()
        } else {
          notification.error({
            message: "Error",
            description: "Can't banner"
          })
        }
      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't banners"
      })
    }
  }
  const handleHidden = () => {
    try {
      updateBannerHidden(rowData?.id).then((res) => {
        if (res?.status === 200) {
          notification.success({
            message: "Success",
            description: "Banner successfully"
          })
          fetchBanners()
        } else {
          notification.error({
            message: "Error",
            description: "Can't banner"
          })
        }
      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't banners"
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
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filteredDataSource);
  };


  return (
    <div>
      <Row justify={"space-between"} style={{margin: "2rem 0"}}>
        <Col span={12}>
          <Input
            placeholder="Search by name"
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
        dataSource={filteredData.length > 0 && searchText !== '' ? filteredData : banner}
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
            title: "Image",
            dataIndex: "url",
            key: "url",
            width: 100,
            render: (value) => <Image src={value} width={160} height={90}/>
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
              <span style={{cursor: "pointer"}} onClick={() => {
                if(record.isShow === 1){
                  setShowHide(false)
                }
                else {
                  setShowHide(true)
                }
                setRowData(record)
                setShowBannerModal(true)
              }}>{record.isShow === 1 ? <> <span style={{cursor: "pointer"}} onClick={() => {
                setIsEdit(true)
                setRowData(record)
                setShowEditModal(true)
              }}><EditIcon style={{marginRight: 8}}/></span><ShowIcon/></> : <><span style={{cursor: "pointer"}} onClick={() => {
                setRowData(record)
                setShowDeleteModal(true)
              }}><DeleteIcon/></span><HiddenIcon/></>}</span>
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
      <BannerModal
        show={showBannerModal}
        title={"Fix banner"}
        content={showhide ? "Are you sure you want to show this banner?" :"Are you sure you want to hidden this banner?"}
        handleFix={showhide ? handleShow : handleHidden}
        handleCancel={() => {
          setRowData(null)
          setShowBannerModal(false)
        }}
      />
    </div>
  )
}

export default Banner