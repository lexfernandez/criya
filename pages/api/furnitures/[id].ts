// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Airtable from "airtable";
import Product from "../../../models/product.model";
import { recordToProduct } from "../../../utils/furnitures";

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);

export default async (req: NextApiRequest, res: NextApiResponse<Product>) => {
  let { id } = req.query;

  const record = await base("Furniture").find(id as string);

  res.status(200).json(recordToProduct(record));
};

