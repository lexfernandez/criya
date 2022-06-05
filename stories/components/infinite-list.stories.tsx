import { ComponentMeta, ComponentStory } from "@storybook/react";
import InfiniteList from "../../components/infinite-list";
import { Default as ProductItem } from "./product.stories";
import { fireEvent, waitFor, within } from "@storybook/testing-library";


export default {
  title: "Components/Product List",
  component: InfiniteList,
  argTypes: { fetchMore: { action: true } },
} as ComponentMeta<typeof InfiniteList>;

const Template: ComponentStory<typeof InfiniteList> = (args) => (
  <InfiniteList {...args} />
);

export const OneProduct = Template.bind({});
OneProduct.args = {
  children: <ProductItem product={ProductItem.args?.product!} />,
};

export const ListOfProducts = Template.bind({});
ListOfProducts.args = {
  children: [
    <ProductItem product={ProductItem.args?.product!} />,
    <ProductItem product={ProductItem.args?.product!} />,
  ],
  hasMoreData: true,
};
ListOfProducts.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const anchor = canvas.getByTestId("anchor");
  fireEvent.scroll(anchor);
  waitFor(async () => {
    expect(args.fetchMore).toHaveBeenCalled();
  });
};

export const NoProduct = Template.bind({});
NoProduct.args = {};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

export const EndOfList = Template.bind({});
EndOfList.args = {
  ...ListOfProducts.args,
  isLoading: false,
  hasMoreData: false,
};
