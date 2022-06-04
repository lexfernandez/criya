import ProductImage from "./product-image.model";

type Product = {
    id: string;
    name: string;
    description: string;
    inStock: boolean;
    materials?: string[];
    size?: string;
    unitCost: number;
    vendors: string[];
    colors?: string[];
    images: ProductImage[];
};

export default Product;