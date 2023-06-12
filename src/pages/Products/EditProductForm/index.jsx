import {Form, Input, Modal} from "antd";
import {useEffect} from "react";

const EditProductForm = ({ data, handleSubmit, visible, handleCancel, isEdit=false }) => {
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
              label="Title"
              name="title"
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
              rules={[{required: true, message: 'Please input your price!'}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Stock"
              name="stock"
              rules={[{required: true, message: 'Please input your stock!'}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Thumbnail"
              name="thumbnail"
              rules={[{required: true, message: 'Please input your thumbnail!'}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Images"
              name="images"
              rules={[{required: true, message: 'Please input your images!'}]}
            >
              <Input/>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  )
}

export default EditProductForm