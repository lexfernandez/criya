// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Airtable, { FieldSet, Records, Record } from "airtable";
import Product from "../../models/product.model";
import ProductImage from "../../models/product-image.model";

Airtable.configure({
  apiKey: "keylRQl2by4Dg3y0L",
});

const base = Airtable.base("appZIOYZ8GJCqy73d");

const recordToProduct = (record: Record<FieldSet>): Product => {
  return {
    id: record.getId() as string,
    name: record.get("Name") as string,
    description: record.get("Description") as string,
    inStock: record.get("In stock") as boolean,
    materials: record.get("Materials") as string[],
    type: record.get("Type") as string,
    size: record.get("Size (WxLxH)") as string,
    unitCost: record.get("Unit cost") as number,
    vendors: record.get("Vendor") as string[],
    colors: record.get("Color") as string[],
    images: record.get("Images") as unknown as ProductImage[],
  };
};

export default async (req: NextApiRequest, res: NextApiResponse<Product[]>) => {
  const { page, itemsPerPage, name, inStock, minPrice, maxPrice } = req.query;

  const records = await base("Furniture").select({}).all();
  const products = records.map((record) => recordToProduct(record));

  res.status(200).json(products);
};
