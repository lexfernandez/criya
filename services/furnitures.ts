import axios from "axios";
import Product from "../models/product.model";
import { Filter } from "./Filter";

class FurnituresService {
  find = ({
    filter,
    page = 1,
    itemsPerPage = 10,
    signal,
  }: {
    filter?: Filter;
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
          name: filter?.name,
          inStock: filter?.inStock,
          minPrice: filter?.minPrice,
          maxPrice:filter?.maxPrice,
        },
      })
      .then((response) => response.data);
}

const furnitureService = new FurnituresService();

export default furnitureService;
