import {Col, Image, Modal, notification, Row, Spin, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {formatCurrency} from "../../../utils/string.js";
import {getOrderByDetail} from "../../../services/order.service.js";
import useCallApi from "../../../../hooks/useCallApi.js";
import Spinner from "../../../components/Spinner/index.jsx";

const OrderDetailModal = ({order_id, showModal, handleCancel}) => {
  const [orders, setOrders] = useState()
  // const fetchOrderDetail = () => {
  //   try {
  //     getOrderByDetail(order_id).then(res => {
  //       if (res?.status === 200) {
  //         setOrders(res?.data?.data)
  //       } else {
  //         notification.error({
  //           header: "Error",
  //           message: "Get orders failed!"
  //         })
  //       }
  //     })
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  const {send: fetchOrderDetail, loading} = useCallApi({
    callApi: getOrderByDetail,
    success: (res) => {
      setOrders(res?.data)
    }
  })


  useEffect(() => {
    fetchOrderDetail(order_id)
  }, [order_id])


  return (
    <Modal
      title="Order Detail"
      open={showModal}
      onOk={handleCancel}
      onCancel={handleCancel}
      width={1000}
    >
      {loading ? <Spinner/> :
        (orders && (<><Row span={24}>
            {orders?.orderItems?.map(order => (
              <Col span={24} style={{marginBottom: "1rem"}}>
                <Row>
                  <Col span={20}>
                    <Row>
                      <Col span={4}>
                        <Image src={order?.productAttributeDefault?.mediaId} width={100} height={100}/>
                      </Col>
                      <Col span={16}>
                        <p>{order?.productAttributeDefault?.productDetailId?.productId?.name} <b>x {order?.number}</b>
                        </p>
                        <p><Tag color={"blue"}>{order?.productAttributeDefault?.size}</Tag> - <Tag
                          color={order?.productAttributeDefault?.color}
                          style={order?.productAttributeDefault?.color === "white" && {
                            color: "black",
                            borderColor: "black"
                          }}>{order?.productAttributeDefault?.color}</Tag></p>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={4}>
                    <p>Price</p>
                    <p
                      style={{color: "#1677FF"}}>{formatCurrency(order?.productAttributeDefault?.productDetailId?.productId?.price)}</p>
                  </Col>
                </Row>
              </Col>
            ))}
            <Col span={24}>
              <Col style={{marginLeft: "auto"}} span={4}>
                <p>Total: {orders && formatCurrency(orders?.totalMoney)}</p>
              </Col>
            </Col>
          </Row>
            <h3>User Information</h3>
            <Row>
              <Table
                style={{width: "100%"}}
                rowKey={(record) => record?.id}
                dataSource={[orders?.address]}
                pagination={false}
                columns={[
                  {
                    title: 'Name',
                    dataIndex: 'fullname',
                    key: 'name',
                    width: 150,
                  },
                  {
                    title: 'Phone',
                    dataIndex: 'phone',
                    key: 'phone',
                    width: 150,
                  },
                  {
                    title: 'Address',
                    dataIndex: 'address',
                    key: 'address',
                    width: 300,
                    render: (value, row) =>
                      <p>{row?.detail}, {row?.commune}, {row?.district}, {row?.provice}, {row?.country}</p>
                  },
                ]}
              />
            </Row>
          </>)
        )}
    </Modal>
  )
}

export default OrderDetailModal;