// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Airtable from "airtable";
import Product from "../../models/product.model";
import { recordToProduct } from "../../utils/furnitures";

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);

export default async (req: NextApiRequest, res: NextApiResponse<Product[]>) => {
  let { page="1", itemsPerPage="10", name, inStock, minPrice, maxPrice } = req.query;

  const expressions: string[] = [];

  if(name) expressions.push(`find("${name}",{Name})`);
  if(inStock!=undefined) expressions.push(`{In Stock}=${inStock=="true"?1:0}`);
  if(minPrice!=undefined || maxPrice!=undefined) {
    const minPriceExpression = `{Unit cost}>=${minPrice}`
    const maxPriceExpression = `{Unit cost}<=${maxPrice}`
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

