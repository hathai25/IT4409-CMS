import {Form, Input} from "antd";
import Uploader from "../../../../components/Uploader/index.jsx";
import {useEffect, useState} from "react";
import {getProductById} from "../../../../services/product.service.js";

const BasicInformation = ({id}) => {
  const [data, setData] = useState()
  const [form] = Form.useForm();

  useEffect(() => {
    try {
      getProductById(id).then((res) => {
        console.log(res)
        setData(res?.data?.data)
      })
    } catch {
      console.log("error")
    }
  }, [id])

  console.log(data)

  return(
    <div>
      {data && <Form
        layout={"vertical"}
        form={form}
        initialValues={data}
      >
        {() => (
          <>
            <Form.Item
              label="Name"
              name="name"
              rules={[{required: true, message: 'Please input your title!',}]}
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
              name="sellOfQuantity"
              rules={[{required: true, message: 'Please input your stock!'}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Thumbnail"
              name="thumbnail"
              rules={[{required: true, message: 'Please input your thumbnail!'}]}
            >
              <Uploader setFormValue={(value) => form.setFieldValue("thumbnail", value)}/>
            </Form.Item>
          </>
        )}
      </Form>}
    </div>
  )
}

export default BasicInformation