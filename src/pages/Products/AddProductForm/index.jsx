import {Form, Input, InputNumber, message, Modal, Select} from "antd";
import {useEffect, useState} from "react";
import Uploader from "../../../components/Uploader/index.jsx";
import {createMedia} from "../../../services/media.service.js";
import {getAllCategories} from "../../../services/category.service.js";

const AddProductForm = ({ data, handleSubmit, visible, handleCancel, isEdit=false }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([])

  useEffect(() => {
    try {
      getAllCategories().then((res) => {
        console.log(res)
        if (res.status === 200) setCategories(res?.data?.data?.items)
        else message.error("Can't get categories")
      })
    } catch (error) {
      message.error("Can't get categories")
    }
  }, [])

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
      title={isEdit ? "Edit product" : "New product"}
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
              label="Name"
              name="name"
              rules={[{required: true, message: 'Please input your title!', }]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{required: true, message: 'Please input your description!'}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {required: true, message: 'Please input your price!'},
                {type: 'number', message: 'Please input a number'}
              ]}
            >
              <InputNumber style={{width: "100%"}}/>
            </Form.Item>
            <Form.Item
              label="Stock"
              name="sellOfQuantity"
              rules={[
                {required: true, message: 'Please input your stock!'},
                {type: 'number', message: 'Please input a number'}
              ]}
            >
              <InputNumber style={{width: "100%"}}/>
            </Form.Item>
            <Form.Item
              label="Thumbnail"
              name="thumbnail"
              rules={[{required: true, message: 'Please input your thumbnail!'}]}
            >
              <Uploader setFormValue={(data) => form.setFieldValue("thumbnail", data)}/>
            </Form.Item>
            <Form.Item
              label="Category"
              name="categoriesId"
              rules={[{required: true, message: 'Please input your title!', }]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: '100%',
                }}
                placeholder="Please select category"
                // onChange={handleChange}
                options={[
                  ...categories?.map((item) => ({
                    label: item?.name,
                    value: item?.id
                  }))
                ]}
              />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  )
}

export default AddProductForm