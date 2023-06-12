import {Button, Col, Image, Input, notification, Row, Select, Table} from "antd";
import {useEffect, useState} from "react";
import {getAllProducts} from "../../services/product.service.js";
import {formatCurrency} from "../../utils/string.js";
import {DeleteFilled, EditFilled, PlusOutlined} from "@ant-design/icons";
import {EditIcon} from "../../assets/Icons/EditIcon.jsx";
import {DeleteIcon} from "../../assets/Icons/DeleteIcon.jsx";
import DeleteModal from "../../components/Modal/DeleteModal/index.jsx";
import EditProductForm from "./EditProductForm/index.jsx";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const initialFormValues = {
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    images: "",
    stock: ""
  }

  const fetchProducts = () => {
    try {
      getAllProducts().then((res) => {
        setProducts(res?.data?.products)
      })
      console.log("fetched")
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Can't get products"
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
              setRowData(initialFormValues)
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
            render: (text, record, index) => <span style={{color:'grey'}}>{index + 1}</span>,
            width: 50,
          },
          {
            title: "Title",
            dataIndex: "title",
            key: "title",
            width: 100,
          },
          {
            title: "Thumbnail",
            dataIndex: "thumbnail",
            key: "thumbnail",
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
            title: "Price",
            dataIndex: "price",
            key: "price",
            width: 100,
            render: (value) => formatCurrency(value)
          },
          {
            title: "Quantity",
            dataIndex: "stock",
            key: "quantity",
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
          pageSize: 5,
        }}
      />
      <EditProductForm
        isEdit={isEdit}
        data={rowData}
        visible={showEditModal}
        handleSubmit={handleEdit}
        handleCancel={() => {
          console.log('cancel')
          setShowEditModal(false)
        }}
      />
      <DeleteModal
        show={showDeleteModal}
        title={"Delete product"}
        content={"Are you sure you want to delete this product?"}
        handleDelete={handleDelete}
        handleCancel={() => {
          console.log('cancel')
          setShowDeleteModal(false)
        }}
      />
    </div>
  )
}

export default Products