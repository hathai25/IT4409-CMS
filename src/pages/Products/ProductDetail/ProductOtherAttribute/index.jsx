import {Button, Col, Image, Input, message, notification, Row, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {
  createProductOtherAttributes,
  createProductOtherAttributesValues, deleteProductDefaultAttributes, deleteProductOtherAttributesValues,
  editProductDefaultAttributes, getAllOtherAttributes, getAllOtherAttributesValues, updateProductOtherAttributesValues,
} from "../../../../services/product.service.js";
import {EditIcon} from "../../../../assets/Icons/EditIcon.jsx";
import AddAttribute from "./AddAttribute/index.jsx";
import {DeleteIcon} from "../../../../assets/Icons/DeleteIcon.jsx";
import BaseModal from "../../../../components/Modal/BaseModal/index.jsx";
import NewAttribute from "./NewAttribute/index.jsx";

const ProductOtherAttribute = ({ productId }) => {
  const [otherAttributes, setOtherAttributes] = useState([])
  const [showAddAttribute, setShowAddAttribute] = useState(false)
  const [selectAttribute, setSelectAttribute] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showNewAttribute, setShowNewAttribute] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [rowData, setRowData] = useState(null)

  const initialDefaulValues = {
    attributeId: '',
    value: '',
  }

  const fetchProductOtherAttributes = () => {
    try {
      getAllOtherAttributes().then((res) => {
        if (res.status === 200) setSelectAttribute(res?.data?.data?.items)
        else message.error("Can't get attributes")
      })
    } catch (error) {
      message.error("Can't get attributes")
    }
  }

  const fetchProductDefaultAttributes = () => {
    try {
      getAllOtherAttributesValues(productId).then((res) => {
        console.log(res?.data?.data)
        setOtherAttributes(res?.data?.data?.items)
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchProductOtherAttributes()
    fetchProductDefaultAttributes()
  }, [productId])

  const handleAddAttribute = (data) => {
    try {
      createProductOtherAttributesValues({
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
      updateProductOtherAttributesValues(rowData?.id, data).then((res) => {
        if (res.status === 200) {
          notification.success({
            message: 'Success',
            description: 'Product attribute updated!',
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
      deleteProductOtherAttributesValues(rowData?.id).then((res) => {
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

  const handleNewAttribute = (data) => {
    try {
      createProductOtherAttributes(data).then((res) => {
        if (res.status === 201) {
          notification.success({
            message: 'Success',
            description: 'Product attribute deleted!',
          })
          setShowNewAttribute(false)
          fetchProductDefaultAttributes()
          fetchProductOtherAttributes()
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
              <p>Other Attributes</p>
            </Col>
            <Col span={12}>
              <Button
                style={{marginTop: 12, float: 'right'}}
                onClick={() => {
                  setIsEdit(false)
                  setRowData(initialDefaulValues)
                  setShowAddAttribute(true)
                }}
                >Add attribute value</Button>
              <Button
                style={{marginTop: 12, marginRight: 8, float: 'right'}}
                onClick={() => {
                  setShowNewAttribute(true)
                }}
              >Add attribute</Button>
            </Col>
          </Row>
          <Table
            dataSource={otherAttributes}
            columns={[
              {
                title: 'Attribute Name',
                dataIndex: 'attributeId',
                key: 'attributeId',
                render: value => <Tag color="blue">{value?.name}</Tag>
              },
              {
                title: 'Value',
                dataIndex: 'value',
                key: 'value',
                render: value => <Tag color={"red"}>{value}</Tag>
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
            attributes={selectAttribute}
            isEdit={isEdit}
            visible={showAddAttribute}
            data={rowData}
            handleSubmit={isEdit ? handleEditAttribute : handleAddAttribute}
            handleCancel={() => setShowAddAttribute(false)}
            />
          <NewAttribute
            visible={showNewAttribute}
            handleSubmit={handleNewAttribute}
            handleCancel={() => setShowNewAttribute(false)}
          />
        </Col>
      </Row>
    </div>
  )
}

export default ProductOtherAttribute