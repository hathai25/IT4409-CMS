import {Modal} from "antd";

const BannerModal = ({ show, handleCancel, handleFix, title, content, ...rest }) => {
  return (
    <Modal
      title={title}
      open={show}
      onOk={handleFix}
      onCancel={handleCancel}
      {...rest}
    >
      <p>{content}</p>
    </Modal>
  )
}

export default DeleteModal