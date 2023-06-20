import {Checkbox, Form, Input, Modal} from "antd";
import {useEffect} from "react";

const EditUserForm = ({ data, handleSubmit, visible, handleCancel, isEdit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields()
    form.setFieldsValue(data)
  }, [data, form])

  return (
    <Modal
      title={isEdit ? "Edit user" : "New user"}
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
          label="Phone"
          name="phone"
          rules={[{required: true, message: 'Please input your phone number!'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{required: true, message: 'Please input your address!'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Active"
          name="isActivity"
          rules={[{required: true, message: 'Please input your username!'}]}
        >
          <Checkbox
            checked={data?.isActivity}
            onChange={(e) => {
            console.log(e)
            form.setFieldValue("isActivity", e?.target?.value)
          }}/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditUserForm