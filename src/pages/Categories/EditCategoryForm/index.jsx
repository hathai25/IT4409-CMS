import {Form, Input, InputNumber, Modal} from "antd";
import {useEffect} from "react";

const EditCategoryForm = ({ data, handleSubmit, visible, handleCancel, isEdit=false }) => {
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
        initialValues={data}
      >
        {() => (
          <>
            <Form.Item
              label="Name"
              name="name"
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
            <Form.Item
              label="Order"
              name="order"
              rules={[
                {required: true, message: 'Please input your order!'},
                {type: 'number', message: 'Please input a number!'}
              ]}
            >
              <InputNumber style={{width: "100%"}}/>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  )
}

export default EditCategoryForm