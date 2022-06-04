import { ComponentMeta, ComponentStory } from "@storybook/react";
import InfiniteList from "../../components/infinite-list";
import {Default as ProductItem} from "./product.stories";

export default {
  title: "Components/Product List",
  component: InfiniteList,
} as ComponentMeta<typeof InfiniteList>;

const Template: ComponentStory<typeof InfiniteList> = (args) => (
  <InfiniteList {...args} />
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
