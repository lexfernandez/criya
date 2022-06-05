import ProductImage from "./product-image.model";

type Vendor = {
    id: string;
    name: string;   
    logo: ProductImage[];
    phoneNumber: string;
};

export default Vendor;