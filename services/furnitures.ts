import axios from "axios";
import Product from "../models/product.model";

type Filter = {
  name?: string;
  inStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
};

class FurnituresService {
  find = ({
    filter: { name, inStock, minPrice, maxPrice },
    page = 1,
    itemsPerPage = 10,
    signal,
  }: {
    filter: Filter;
    page?: number;
    itemsPerPage?: number;
    signal?: AbortSignal;
  }) =>
    axios
      .get<Product[]>("/api/furnitures", {
        signal,
        params: {
          page,
          itemsPerPage,
          name,
          inStock,
          minPrice,
          maxPrice,
        },
      })
      .then((response) => response.data);
}

const furnitureService = new FurnituresService();

export default furnitureService;
