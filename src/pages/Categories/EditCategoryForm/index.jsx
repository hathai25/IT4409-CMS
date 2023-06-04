import {Form, Input, Modal} from "antd";
import {useEffect} from "react";

const EditCategoryForm = ({ data, handleSubmit, visible, handleCancel, isEdit=false }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields()
    form.setFieldsValue(data)
  }, [data, form])

  return (
    <Modal
      title={isEdit ? "Edit category" : "New category"}
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
        initialValues={isEdit ? data : null}
      >
        <Form.Item
          label="Name"
          name="title"
          rules={[{required: true, message: 'Please input your category!'}]}
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
      </Form>
    </Modal>
  )
}

export default EditCategoryForm