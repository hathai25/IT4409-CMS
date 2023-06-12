import {Form, Input, Modal} from "antd";
import {useEffect} from "react";
import Uploader from "../../../components/Uploader/index.jsx";

const EditBannerForm = ({ data, handleSubmit, visible, handleCancel, isEdit=false }) => {
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
        {() => (
          <>
            <Form.Item
              label="Image"
              name="url"
              rules={[{required: true, message: 'Please input your banner image!'}]}
            >
              <Uploader setFormValue={(value) => form.setFieldValue("url", value)}/>
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{required: true, message: 'Please input your description!'}]}
            >
              <Input/>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  )
}

export default EditBannerForm