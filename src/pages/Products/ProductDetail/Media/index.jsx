import {useEffect, useState} from "react";
import {getProductMedia, updateProductDetails} from "../../../../services/product.service.js";
import {Button, message, notification, Upload} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import axios from "axios";
import useCallApi from "../../../../../hooks/useCallApi.js";
import Spinner from "../../../../components/Spinner/index.jsx";

const Media = ({ productId }) => {
  const [medias, setMedias] = useState([])
  const uploadInstance = axios.create()

  const { send: fetchMedia, loading } = useCallApi({
    callApi: getProductMedia,
    success: (res) => {
      setMedias([
        ...res?.data?.medias?.map((item) => ({
          uid: item,
          name: item,
          status: 'done',
          url: item,
        }))
      ])
    },
    error: () => {
      message.error("Can't get product media")
    }
  })

  const handleSaveMedias = () => {
    try {
      updateProductDetails(productId, { medias: [
        ...medias?.map((item) => item?.url)
      ]}).then((res) => {
        if (res.status === 200) {
          fetchMedia(productId)
          notification.success({
            message: "Updated",
            description: "Media updated"
          })
        }
        else notification.error({
          message: "Not updated",
          description: "Media not updated"
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpload = (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    const formData = new FormData();
    formData.append('file', file)
    formData.append("upload_preset", "bxckfvad")
    try {
      uploadInstance.post("https://api.cloudinary.com/v1_1/dzazt6bib/image/upload", formData)
        .then(res => {
          if (res) {
            onSuccess(file);
            const data = res?.data?.url
            message.success(`${file.name} tải file thành công.`);
            setMedias(prevMedias => [
              ...prevMedias,
              {
                uid: data,
                name: data,
                status: 'done',
                url: data,
              }
            ].filter(e => e?.uid === e?.url))
          } else {
            message.error(`${file.name} tải file thành công.`);
          }
        })
    } catch (e) {
      message.error(`${file.name} tải file thành công.`);
    }
  }

  useEffect(() => {
    fetchMedia(productId)
  }, [productId])

  const handleChange = ({ fileList: newFileList }) => {
    setMedias(newFileList);
  }

  return(
    <div>
      {loading ? <div style={{height: 600}}><Spinner/></div> : <>
      <Upload
        customRequest={handleUpload}
        listType="picture-card"
        fileList={medias}
        onChange={handleChange}
      >
        <div>
          <PlusOutlined />
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </div>
      </Upload>
      <Button type="primary" onClick={handleSaveMedias}>
        Save
      </Button>
      </>}
    </div>
  )
}

export default Media