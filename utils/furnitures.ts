import ProductImage from "../models/product-image.model";
import Product from "../models/product.model";
import { FieldSet, Record } from "airtable";

export const recordToProduct = (record: Record<FieldSet>): Product => {
    return {
      id: record.getId() as string,
      name: record.get("Name") as string,
      description: record.get("Description") as string,
      inStock: record.get("In stock") as boolean ?? false,
      materials: record.get("Materials") as string[],
      type: record.get("Type") as string,
      size: record.get("Size (WxLxH)") as string,
      unitCost: record.get("Unit cost") as number,
      vendors: record.get("Vendor") as string[],
      colors: record.get("Color") as string[],
      images: record.get("Images") as unknown as ProductImage[],
    };
  };