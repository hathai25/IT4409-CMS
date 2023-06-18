import {Button, Form, Input, message, Select} from "antd";
import Uploader from "../../../../components/Uploader/index.jsx";
import {useEffect, useState} from "react";
import {getProductById, updateProduct} from "../../../../services/product.service.js";
import {getAllCategories} from "../../../../services/category.service.js";

const BasicInformation = ({id}) => {
  const [data, setData] = useState()
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
    try {
      getProductById(id).then((res) => {
        console.log(res)
        setData(res?.data?.data)
      })
    } catch {
      console.log("error")
    }
  }, [id])

  return(
    <div>
      {data && <Form
        layout={"vertical"}
        form={form}
        initialValues={{
          ...data,
          categoriesId: data?.categories?.map((item) => item?.id)
        }}
        onFinish={(values) => {
            try {
              updateProduct(id, values).then((res) => {
                console.log(res)
                if (res.status === 200) message.success("Updated")
                else message.error("Can't update")
              })
              } catch (error) {
                  message.error("Can't update")
              }
            }
          }
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
            <Button style={{float: "right"}} type="primary" htmlType="submit">Update</Button>
          </>
        )}
      </Form>}
    </div>
  )
}

export default BasicInformation