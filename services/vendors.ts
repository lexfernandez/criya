import axios from "axios";
import Product from "../models/product.model";

class VendorsService {
  findById = ({ id, signal }: { id: string, signal?: AbortSignal }) =>
    axios
      .get<Product>(`/api/vendors/${id}`, { signal })
      .then((response) => response.data);
}

const vendorsService = new VendorsService();

export default vendorsService;
