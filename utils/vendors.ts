import ProductImage from "../models/product-image.model";
import { FieldSet, Record } from "airtable";
import Vendor from "../models/vendors.model";

export const recordToVendor = (record: Record<FieldSet>): Vendor => {
    return {
      id: record.getId() as string,
      name: record.get("Name") as string,
      logo: record.get("Images") as unknown as ProductImage[],
      phoneNumber: record.get("Phone number") as string
    };
  };