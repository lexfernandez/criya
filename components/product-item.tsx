import Card from "./card";
import Product from "../models/product.model";

type Props = {
    product: Product
}

const ProductItem = ({ product }: Props) => {
  return (
    <Card>
      <div className="m-2 grid grid-cols-4 gap-4 ">
        <div className="col-span-1  ">
            <img src={product.images[0].url} className="content-around max-w-20"/>
        </div>
        <div className="col-span-3">
          <div className="font-monserrat font-bold">{product.name}</div>
          <div className="font-monserrat font-bold text-pale-silver opacity-40 flex-nowrap">by{product.vendors.map(vendor=><span key={vendor} className="pl-2 font-semibold">{vendor}</span>)}</div>
          <div className="opacity-60 truncate ...">{product.description}</div>
          <div className="opacity-60">{`$ ${product.unitCost.toFixed(2)}`}</div>
        </div>
      </div>
    </Card>
  );
};

export default ProductItem;
