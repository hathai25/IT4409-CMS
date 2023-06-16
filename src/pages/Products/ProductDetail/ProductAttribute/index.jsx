import {Button, Col, Input, Row} from "antd";
import {useEffect, useState} from "react";
import {getProductAttributes} from "../../../../services/product.service.js";

const AddAttribute = () => {
  return(
    <div>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <p>Attribute Name</p>
          <Input/>
        </Col>
        <Col span={12}>
          <p>Attribute Value</p>
          <Input/>
        </Col>
      </Row>
    </div>
  )
}

const ProductAttribute = ({ productId }) => {
  const [attributeList, setAttributeList] = useState([])
  const [attributes, setAttributes] = useState()
  useEffect(() => {
    try {
      getProductAttributes(productId).then((res) => {
        console.log(res?.data?.data)
        setAttributes({
          attributeDefaults: res?.data?.data?.attributeDefaults,
          attributeValues: res?.data?.data?.attributeValues
        })
      })
    } catch (e) {
      console.log(e)
    }
  }, [productId])

  console.log(attributes)

  return(
    <div>
      <Row>
        <Col span={12}>
          <p>Default Attributes</p>
          {attributes?.attributeDefaults.map((attribute) => (
            <div>
              <p>{attribute?.name}</p>
              <p>{attribute?.value}</p>
            </div>
          ))}
        </Col>
        <Col span={12}>
          <p>Other Attributes</p>
          {attributes?.attributeValues.map((attribute) => (
            <div>
              <p>{attribute?.name}</p>
              <p>{attribute?.value}</p>
            </div>
          ))}
          {attributeList?.map((attribute) => (
          <AddAttribute/>
          ))}
          <Button
            style={{marginTop: 12}}
            onClick={() => {
              // append AddAttribute component to list
              setAttributeList([...attributeList, ''])
            }}
          >
            Add Attribute
          </Button>
        </Col>
      </Row>

    </div>
  )
}

export default ProductAttribute