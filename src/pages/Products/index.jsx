import {Button, Col, Image, Input, notification, Row, Select, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {createProduct, deleteProduct, getAllProducts} from "../../services/product.service.js";
import {formatCurrency} from "../../utils/string.js";
import {DeleteFilled, EditFilled, PlusOutlined} from "@ant-design/icons";
import {EditIcon} from "../../assets/Icons/EditIcon.jsx";
import {DeleteIcon} from "../../assets/Icons/DeleteIcon.jsx";
import DeleteModal from "../../components/Modal/DeleteModal/index.jsx";
import AddProductForm from "./AddProductForm/index.jsx";
import {useNavigate} from "react-router-dom";
import useCallApi from "../../../hooks/useCallApi.js";
import Spinner from "../../components/Spinner/index.jsx";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const initialFormValues = {
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    images: "",
    stock: ""
  }

  const { send: fetchProducts, loading } = useCallApi({
    callApi: getAllProducts,
    success: (res) => {
      setProducts(res?.data?.items)
    },
    error: () => {
      notification.error({
        message: "Error",
        description: "Can't get products"
      })
    }
  })


  const handleEdit = (data) => {
    try {
      createProduct(data).then((res) => {
        if (res.status === 201) {
          notification.success({
            message: 'Success',
            description: 'Product created!',
          })
          setShowEditModal(false)
          fetchProducts()
        }
      })
    } catch (e) {
      notification.error({
        message: "Error",
        description: "Product not created!"
      })
    }
  }

  const handleDelete = () => {
    try {
      deleteProduct(rowData?.id).then((res) => {
        console.log(res)
        if (res.status === 200) {
          notification.success({
            message: 'Success',
            description: 'Product deleted!',
          })
          setShowDeleteModal(false)
          fetchProducts()
        }
      })
    } catch (e) {
      notification.error({
        message: "Error",
        description: "Product not deleted!"
      })
    }
  }


  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const filteredDataSource = products.filter((item) =>
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
            dataSource={filteredData.length >= 0 && searchText !== '' ? filteredData : products}
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
                dataIndex: "name",
                key: "name",
                width: 100,
              },
              {
                title: "Thumbnail",
                dataIndex: "thumbnail",
                key: "thumbnail",
                width: 100,
                render: (value) => <Image src={value} width={90} height={160}/>
              },
              {
                title: "Category",
                dataIndex: "categories",
                key: "categories",
                width: 100,
                render: (value) => value?.map((item) => <Tag color="blue">{item?.name}</Tag>)
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
                dataIndex: "sellOfQuantity",
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
                    console.log(record)
                    navigate(`/products/${record.id}`, {
                      state: {
                        productDetailId: record?.productDetail?.id
                      }
                    })
                  }}><EditIcon style={{marginRight: 8}}/></span>
                  <span style={{cursor: "pointer"}} onClick={() => {
                    setShowDeleteModal(true)
                    setRowData(record)
                  }}><DeleteIcon/></span>
                </>,
              },
            ]}
            pagination={{
              pageSize: 5,
            }}
            scroll={{
              y: 600,
            }}
          />
          <AddProductForm
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
            title={"Delete product"}
            content={"Are you sure you want to delete this product?"}
            handleDelete={handleDelete}
            handleCancel={() => {
              setShowDeleteModal(false)
            }}
          />
        </>
      )}
    </div>
  )
}

export default Products