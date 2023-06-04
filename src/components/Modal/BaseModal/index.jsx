import {Modal} from "antd";

const BaseModal = ({ show, handleOk, handleCancel, title, content, ...rest }) => {
  return (
    <Modal
      title={title}
      open={show}
      onOk={handleOk}
      onCancel={handleCancel}
      {...rest}
    >
      <p>{content}</p>
    </Modal>
  )
}

export default BaseModal