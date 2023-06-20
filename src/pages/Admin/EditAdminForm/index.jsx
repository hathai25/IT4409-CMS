import {Form, Input, Modal, Select} from "antd";
import {useEffect} from "react";

const EditAdminForm = ({ data, handleSubmit, visible, handleCancel, isEdit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields()
    form.setFieldsValue(data)
  }, [data, form])

  return (
    <Modal
      title={isEdit ? "Edit admin" : "New admin"}
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
          label="Email"
          name="email"
          rules={[{required: true, message: 'Please input admin email!'}, {type: 'email', message: 'Please input a valid email'}]}
        >
          <Input placeholder="Input email" />
        </Form.Item>
        {!isEdit && <Form.Item
          label="Password"
          name="password"
          rules={[{required: true, message: 'Please input admin password!'}]}
        >
          <Input.Password placeholder="Input password"/>
        </Form.Item>}
        <Form.Item
          label="Roles"
          name="roles"
          rules={[{required: true, message: 'Please input your phone number!'}]}
        >
          <Select
            placeholder="Select admin role"
            allowClear
            mode={"multiple"}
          >
            <Select.Option value="super admin">Super Admin</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="manage product">Manage Product</Select.Option>
            <Select.Option value="manage order">Manage Order</Select.Option>
            <Select.Option value="manage page">Manage Page</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditAdminForm