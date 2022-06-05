// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Airtable from "airtable";
import Vendor from "../../../models/vendors.model";
import { recordToVendor } from "../../../utils/vendors";

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);

export default async (req: NextApiRequest, res: NextApiResponse<Vendor>) => {
  let { id } = req.query;

  const record = await base("Vendors").find(id as string);

  res.status(200).json(recordToVendor(record));
};

