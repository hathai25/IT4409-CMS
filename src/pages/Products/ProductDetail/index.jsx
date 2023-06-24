import {Tabs} from "antd";
import BasicInformation from "./BasicInformation/index.jsx";
import {useLocation, useParams} from "react-router-dom";
import ProductAttribute from "./ProductAttribute/index.jsx";
import Media from "./Media/index.jsx";
import ProductOtherAttribute from "./ProductOtherAttribute/index.jsx";

const ProductDetail = () => {
  //get product id from url
  const params = useParams()
  const { state } = useLocation()

  const items = [
    {
      key: '1',
      label: `Basic Information`,
      children: <BasicInformation id={Number(params?.id)}/>
    },
    {
      key: '2',
      label: `Product Attributes`,
      children: <ProductAttribute productId={Number(state?.productDetailId)}/>,
    },
    {
      key: '3',
      label: `Other Attributes`,
      children: <ProductOtherAttribute productId={Number(state?.productDetailId)}/>,
    },
    {
      key: '4',
      label: `Media`,
      children: <Media productId={Number(state?.productDetailId)}/>,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  )
}

export default ProductDetail