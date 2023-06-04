import {Button, Col, Input, notification, Row, Table} from "antd";
import {useEffect, useState} from "react";
import {getAllProducts} from "../../services/product.service.js";
import {EditIcon} from "../../assets/Icons/EditIcon.jsx";
import {DeleteIcon} from "../../assets/Icons/DeleteIcon.jsx";
import DeleteModal from "../../components/Modal/DeleteModal/index.jsx";
import EditCategoryForm from "./EditCategoryForm/index.jsx";
import {PlusOutlined} from "@ant-design/icons";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const fetchProducts = () => {
    try {
      getAllProducts().then((res) => {
        setCategories(res?.data?.products)
      })
      console.log("fetched")
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't get categories"
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


  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const filteredDataSource = categories.filter((item) =>
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
              setShowEditModal(true)
            }}
          >
            New <PlusOutlined/>
          </Button>
        </Col>
      </Row>

      <Table
        dataSource={filteredData.length > 0 ? filteredData : categories}
        rowKey={(record) => record?.id}
        columns={[
          {
            title: '#',
            dataIndex: 'key',
            rowScope: 'row',
            render: (text, record, index) => <span style={{color:'grey'}}>{index + 1}</span>,
            width: 50,
          },
          {
            title: "Name",
            dataIndex: "title",
            key: "title",
            width: 100,
          },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
            width: 400,
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
        title={"Delete category"}
        content={"Are you sure you want to delete this category?"}
        handleDelete={handleDelete}
        handleCancel={() => {
          console.log('cancel')
          setShowDeleteModal(false)
        }}
      />
    </div>
  )
}

export default Categories