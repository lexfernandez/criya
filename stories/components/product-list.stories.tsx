import { ComponentMeta, ComponentStory } from "@storybook/react";
import ProductList from "../../components/product-list";
import {Default as ProductItem} from "./product.stories";

export default {
  title: "Components/Product List",
  component: ProductList,
} as ComponentMeta<typeof ProductList>;

const Template: ComponentStory<typeof ProductList> = (args) => (
  <ProductList {...args} />
);

export const OneProduct = Template.bind({});
OneProduct.args = {
    children: <ProductItem product={ProductItem.args?.product!} />
};

export const MultipleProduct = Template.bind({});
MultipleProduct.args = {
    children: [<ProductItem product={ProductItem.args?.product!} />,<ProductItem product={ProductItem.args?.product!} />]
};

export const NoProduct = Template.bind({});
NoProduct.args = {
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true
};
