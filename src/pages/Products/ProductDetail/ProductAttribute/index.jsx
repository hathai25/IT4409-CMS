import {Button, Col, Image, Input, notification, Row, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {
  createProductDefaultAttributes, deleteProductDefaultAttributes,
  editProductDefaultAttributes,
  getProductDefaultAttributes
} from "../../../../services/product.service.js";
import {EditIcon} from "../../../../assets/Icons/EditIcon.jsx";
import AddAttribute from "./AddAttribute/index.jsx";
import {DeleteIcon} from "../../../../assets/Icons/DeleteIcon.jsx";
import BaseModal from "../../../../components/Modal/BaseModal/index.jsx";

const ProductAttribute = ({ productId }) => {
  const [attributeList, setAttributeList] = useState([])
  const [defaultAttributes, setDefaultAttributes] = useState([])
  const [showAddAttribute, setShowAddAttribute] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [rowData, setRowData] = useState(null)

  const initialDefaulValues = {
    size: '',
    color: '',
    inventoryNumber: 0,
    mediaId: ''
  }

  const fetchProductDefaultAttributes = () => {
    try {
      getProductDefaultAttributes(productId).then((res) => {
        console.log(res?.data?.data)
        setDefaultAttributes(res?.data?.data?.items)
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchProductDefaultAttributes()
  }, [productId])

  const handleAddAttribute = (data) => {
    try {
      createProductDefaultAttributes({
        ...data,
        productDetailId: productId
      }).then((res) => {
        if (res.status === 201) {
          notification.success({
            message: 'Success',
            description: 'Product attribute created!',
          })
          setShowAddAttribute(false)
          fetchProductDefaultAttributes()
        } else {
          notification.error({
            message: 'Error',
            description: 'Something went wrong!',
          })
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const handleEditAttribute = (data) => {
    try {
      editProductDefaultAttributes(rowData?.id, data).then((res) => {
        if (res.status === 200) {
          notification.success({
            message: 'Success',
            description: 'Product attribute created!',
          })
          setShowAddAttribute(false)
          fetchProductDefaultAttributes()
        } else {
          notification.error({
            message: 'Error',
            description: 'Something went wrong!',
          })
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const handleDeleteAttribute = () => {
    try {
      deleteProductDefaultAttributes(rowData?.id).then((res) => {
        if (res.status === 200) {
          notification.success({
            message: 'Success',
            description: 'Product attribute deleted!',
          })
          setShowDeleteModal(false)
          fetchProductDefaultAttributes()
        } else {
          notification.error({
            message: 'Error',
            description: 'Something went wrong!',
          })
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  return(
    <div>
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <Row>
            <Col span={12}>
              <p>Default Attributes</p>
            </Col>
            <Col span={12}>
              <Button
                style={{marginTop: 12, float: 'right'}}
                onClick={() => {
                  setIsEdit(false)
                  setRowData(initialDefaulValues)
                  setShowAddAttribute(true)
                }}
                >Add attribute</Button>
            </Col>
          </Row>
          <Table
            dataSource={defaultAttributes}
            columns={[
              {
                title: 'Size',
                dataIndex: 'size',
                key: 'size',
                render: value => <Tag color="blue">{value}</Tag>
              },
              {
                title: 'Color',
                dataIndex: 'color',
                key: 'color',
                render: value => <Tag color={value}>{value}</Tag>
              },
              {
                title: 'Stock',
                dataIndex: 'inventoryNumber',
                key: 'inventoryNumber',
              },
              {
                title: 'Media',
                dataIndex: 'mediaId',
                key: 'mediaId',
                render: (value) => <Image src={value} width={50} height={50}/>,
              },
              {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                align: 'right',
                render: (value, record) => (
                  <>
                    <span
                      style={{cursor: 'pointer'}}
                      onClick={() => {
                        setIsEdit(true)
                        setRowData(record)
                        setShowAddAttribute(true)
                      }}
                      >
                      <EditIcon style={{marginRight: 8}}/>
                    </span>
                    <span
                      style={{cursor: 'pointer'}}
                      onClick={() => {
                        setRowData(record)
                        setShowDeleteModal(true)
                      }}
                    >
                      <DeleteIcon/>
                    </span>
                  </>
              )}
            ]}
          />
          <BaseModal
            visible={showDeleteModal}
            title="Delete Attribute"
            handleOk={handleDeleteAttribute}
            handleCancel={() => setShowDeleteModal(false)}
            content={<p>Are you sure you want to delete this attribute?</p>}
          />
          <AddAttribute
            isEdit={isEdit}
            visible={showAddAttribute}
            data={rowData}
            handleSubmit={isEdit ? handleEditAttribute : handleAddAttribute}
            handleCancel={() => setShowAddAttribute(false)}
            />
        </Col>
      </Row>
    </div>
  )
}

export default ProductAttribute