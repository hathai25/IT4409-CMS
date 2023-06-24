import {Button, Col, Input, notification, Row, Table} from "antd";
import {useEffect, useState} from "react";
import {EditIcon} from "../../assets/Icons/EditIcon.jsx";
import {DeleteIcon} from "../../assets/Icons/DeleteIcon.jsx";
import DeleteModal from "../../components/Modal/DeleteModal/index.jsx";
import EditCategoryForm from "./EditCategoryForm/index.jsx";
import {PlusOutlined} from "@ant-design/icons";
import {createCategory, deleteCategory, getAllCategories, updateCategory} from "../../services/category.service.js";
import useCallApi from "../../../hooks/useCallApi.js";
import Spinner from "../../components/Spinner/index.jsx";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const initialFormValues = {
    name: "",
    description: "",
    order: "",
  }

  const {send: fetchCategories, loading} = useCallApi({
    callApi: getAllCategories,
    success: (res) => {
      setCategories(res?.data?.items)
    },
    error: () => {
      notification.error({
        message: "Error",
        description: "Can't get categories"
      })
    }
  })

  const handleAdd = (data) => {
    try {
      createCategory(data).then((res) => {
        if (res?.status === 201) {
          notification.success({
            message: "Success",
            description: "Category created successfully"
          })
          setShowEditModal(false)
          fetchCategories()
        } else {
          notification.error({
            message: "Error",
            description: "Can't create category"
          })
        }
      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't create category"
      })
    }
  }

  const handleEdit = (data) => {
    try {
      updateCategory(rowData?.id, data).then((res) => {
        if (res?.status === 200) {
          notification.success({
            message: "Success",
            description: "Category updated successfully"
          })
          setShowEditModal(false)
          fetchCategories()
        } else {
          notification.error({
            message: "Error",
            description: "Can't update category"
          })
        }
      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't update category"
      })
    }
  }

  const handleDelete = () => {
    try {
      deleteCategory(rowData?.id).then((res) => {
        if (res?.status === 201) {
          notification.success({
            message: "Success",
            description: "Category deleted successfully"
          })
          setShowEditModal(false)
          fetchCategories()
        } else {
          notification.error({
            message: "Error",
            description: "Can't delete category"
          })
        }
      })
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't delete category"
      })
    }
  }


  useEffect(() => {
    fetchCategories()
  }, [])

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const filteredDataSource = categories.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
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
            dataSource={filteredData.length >= 0 && searchText !== '' ? filteredData : categories}
            rowKey={(record) => record?.name}
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
                title: "Name",
                dataIndex: "name",
                key: "name",
                width: 100,
              },
              {
                title: "Description",
                dataIndex: "description",
                key: "description",
                width: 400,
              },
              {
                title: "Order",
                dataIndex: "order",
                key: "order",
                width: 100,
              },
              {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                align: 'right',
                width: 100,
                render: (text, record) => <>
                    <span style={{cursor: "pointer"}} onClick={() => {
                      setIsEdit(true)
                      setRowData(record)
                      setShowEditModal(true)
                    }}><EditIcon style={{marginRight: 8}}/></span>
                  <span style={{cursor: "pointer"}} onClick={() => setShowDeleteModal(true)}><DeleteIcon/></span>
                </>,
              },
            ]}
            pagination={{
              pageSize: 10,
            }}
          />
          <EditCategoryForm
            isEdit={isEdit}
            data={rowData}
            visible={showEditModal}
            handleSubmit={isEdit ? handleEdit : handleAdd}
            handleCancel={() => {
              console.log('cancel')
              setShowEditModal(false)
            }}
          />
          <DeleteModal
            show={showDeleteModal}
            title={"Delete category"}
            content={"Are you sure you want to delete this category?"}
            handleDelete={handleDelete}
            handleCancel={() => {
              console.log('cancel')
              setShowDeleteModal(false)
            }}
          />
        </>
      )}
    </div>
  )
}

export default Categories