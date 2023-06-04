import {Form, Input, Modal} from "antd";
import {useEffect} from "react";

const EditBannerForm = ({ data, handleSubmit, visible, handleCancel, isEdit=false }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields()
    form.setFieldsValue(data)
  }, [data, form])

  return (
    <Modal
      title={isEdit ? "Edit banner" : "New banner"}
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
        <Form.Item
          label="Name"
          name="title"
          rules={[{required: true, message: 'Please input your banner!'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Image"
          name="thumbnail"
          rules={[{required: true, message: 'Please input your banner image!'}]}
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

export default EditBannerForm