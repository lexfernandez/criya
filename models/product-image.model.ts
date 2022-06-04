import Thumbnail from "./thumbnail.model";

type ProductImage = {
    id: string;
    width: number;
    height: number;
    url: string;
    thumbnails: Thumbnail[];
};

export default ProductImage;