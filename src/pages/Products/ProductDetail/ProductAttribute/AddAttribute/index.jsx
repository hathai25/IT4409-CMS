import {Form, Input, InputNumber, message, Modal, Select} from "antd";
import {useEffect, useState} from "react";
import Uploader from "../../../../../components/Uploader/index.jsx";
const AddAttribute = ({ data, handleSubmit, visible, handleCancel, isEdit=false }) => {
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
        initialValues={data}
      >
        {() => (
          <>
            <Form.Item
              label="Size"
              name="size"
              rules={[{required: true, message: 'Please input your size!', }]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Color"
              name="color"
              rules={[{required: true, message: 'Please input your color!'}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Stock"
              name="inventoryNumber"
              rules={[
                {required: true, message: 'Please input your stock!'},
                {type: 'number', message: 'Please input a number'}
              ]}
            >
              <InputNumber style={{width: "100%"}}/>
            </Form.Item>
            <Form.Item
              label="Media"
              name="mediaId"
              rules={[{required: true, message: 'Please input your thumbnail!'}]}
            >
              <Uploader setFormValue={(data) => form.setFieldValue("mediaId", data)}/>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  )
}

export default AddAttribute