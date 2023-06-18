import {Form, Input, InputNumber, message, Modal, Select} from "antd";
import {useEffect, useState} from "react";
import {getAllOtherAttributes} from "../../../../../services/product.service.js";
const AddAttribute = ({ data, handleSubmit, visible, handleCancel, isEdit=false, attributes }) => {
  const [form] = Form.useForm();


  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue(data)
      form.validateFields()
    } else {
      form.resetFields()
      form.setFieldsValue(data)
    }
  }, [data, form, isEdit])

  return (
    <Modal
      title={isEdit ? "Edit attribute" : "Add attribute"}
      open={visible}
      onCancel={handleCancel}
      onOk={() => {
        form.validateFields().then(values => {
          handleSubmit(values)
        })
      }}
    >
      <Form
        layout={"vertical"}
        form={form}
        initialValues={{
          ...data,
          attributeId: data?.attributeId?.id
        }}
      >
        {() => (
          <>
            <Form.Item
              label="Attribute"
              name="attributeId"
              rules={[{required: true, message: 'Please input your attribute!', }]}
            >
              <Select
                placeholder="Select a attribute"
                allowClear
                style={{
                  width: '100%',
                }}
                options={[
                  ...attributes.map((item) => ({
                    label: item?.name,
                    value: item?.id
                  }))
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Value"
              name="value"
              rules={[{required: true, message: 'Please input your value!'}]}
            >
              <Input placeholder="Input attribute value"/>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  )
}

export default AddAttribute