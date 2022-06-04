import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  isLoading: boolean;
}>;

const ProductList = ({ children, isLoading }: Props) => {
  if (isLoading) return <div className="text-center">Retrieving products</div>;

  if (!children) return <div className="text-center">Not products found</div>;

  return <div className="flex flex-col justify-center">{children}</div>;
};

export default ProductList;
