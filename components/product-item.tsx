import Card from "./card";
import Product from "../models/product.model";
import { useQueries, useQuery } from "react-query";
import vendorsService from "../services/vendors";

type Props = {
  product: Product;
};

const ProductItem = ({ product }: Props) => {
  const vendors = useQueries(
    product.vendors.map((vendorId) => ({
      queryKey: ["vendor", vendorId],
      queryFn: () => vendorsService.findById({ id: vendorId }),
    })) || []
  );

  return (
    <Card>
      <div className="m-2 grid grid-cols-4 gap-4 ">
        <div className="col-span-1  ">
          <img
            src={product.images[0].url}
            className="content-around max-w-20"
          />
        </div>
        <div className="col-span-3">
          <div className="font-monserrat font-bold">{product.name}</div>
          <h2 className="font-monserrat text-sm title-font text-gray-500 tracking-widest">
            by{vendors.map(vendor=><span key={vendor.data?.id} className="pl-2 font-semibold">{vendor.data?.name}</span>)}
            </h2>
          <div className="opacity-60 truncate ...">{product.description}</div>
          <div className="opacity-60">{`$ ${product.unitCost.toFixed(2)}`}</div>
        </div>
      </div>
    </Card>
  );
};

export default ProductItem;
