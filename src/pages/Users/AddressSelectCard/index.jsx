import { Card } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const AddressSelectCard = ({ address }) => {
    return (
        <Card
          title={<div style={{
            display: "flex",
            justifyContent: "space-between",
          }}>
            <p>Address</p>
            {address?.isDefault && <p style={{color: "#0d6efd"}}>Default</p>}
          </div>}
          style={{
            width: '100%',
            textAlign: "left",
            border: "1px solid #0d6efd"
          }}
        >
          <p>
            <span style={{fontWeight: 600}}>
                {address?.fullname}
            </span> |  
            <span style={{color: "#0d6efd", marginLeft: 2}}>
                {address?.phone}
            </span>
            </p>
          <p>
            <HomeOutlined style={{color: "#0d6efd", marginRight: 5}}/> 
            {address?.detail}, {address?.commune}, {address?.district}, {address?.provice}, {address?.country}
            </p>
        </Card>
    );
}

export default AddressSelectCard;