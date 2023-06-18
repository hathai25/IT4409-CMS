import {Form, Input, Modal} from "antd";
import {useEffect} from "react";
const NewAttribute = ({ handleSubmit, visible, handleCancel}) => {
  const [form] = Form.useForm();

  useEffect(() => {
      form.resetFields()
  }, [form])

  return (
    <Modal
      title={"New attribute"}
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
      >
        {() => (
          <>
            <Form.Item
              label="Name"
              name="name"
              rules={[{required: true, message: 'Please input your attribute!'}]}
            >
              <Input placeholder="Input attribute value"/>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  )
}

export default NewAttribute