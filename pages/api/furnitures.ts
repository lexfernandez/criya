// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Airtable, { FieldSet, Records, Record } from "airtable";
import Product from "../../models/product.model";
import ProductImage from "../../models/product-image.model";

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);

const recordToProduct = (record: Record<FieldSet>): Product => {
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

export default async (req: NextApiRequest, res: NextApiResponse<Product[]>) => {
  let { page="1", itemsPerPage="10", name, inStock, minPrice, maxPrice } = req.query;


  const expressions: string[] = [];

  console.log({ page, itemsPerPage, name, inStock, minPrice, maxPrice})
  if(name) expressions.push(`find("${name}",{Name})`);
  if(inStock!=undefined) expressions.push(`{In Stock}=${inStock=="true"?1:0}`);
  if(minPrice!=undefined || maxPrice!=undefined) {
    const minPriceExpression = `{Unit cost}>=${minPrice}`
    const maxPriceExpression = `{Unit cost}<=${maxPrice}`
    console.log({minPriceExpression,maxPriceExpression})
    if(minPrice!=undefined && maxPrice!=undefined){
      expressions.push(`AND(${minPriceExpression},${maxPriceExpression})`);
    }else{
      expressions.push(minPrice!=undefined? minPriceExpression : maxPriceExpression);
    }
  }

  const formula = expressions.length?  `AND(${expressions.join(",")})`: ""

  const records = await base("Furniture").select({
    filterByFormula: formula
    }).all();


  const pageSize = Number(itemsPerPage);
  const offset = Number(itemsPerPage) *(Number(page)-1);
  const products = records.slice(offset,offset+pageSize).map((record) => recordToProduct(record));

  res.status(200).json(products);
};

