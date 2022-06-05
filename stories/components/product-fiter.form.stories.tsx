import { ComponentMeta, ComponentStory } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import ProductFilter from "../../components/product-filter.form";

export default {
  title: "Components/Product Filter",
  component: ProductFilter,
  argTypes: { onSubmit: { action: true } },
} as ComponentMeta<typeof ProductFilter>;

const Template: ComponentStory<typeof ProductFilter> = (args) => (
  <ProductFilter {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const FilledForm = Template.bind({});
FilledForm.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const name = canvas.getByTestId("name");
  await userEvent.type(name, "book", { delay: 100 });
  const inStock = canvas.getByTestId("inStock");
  await  userEvent.click(inStock);

  const submit = canvas.getByTestId("submit");
  await  userEvent.click(submit);
  await waitFor(async () => {
    expect(args.onSubmit).toHaveBeenCalledWith({
      name: "book",
      inStock: true,
    });
  });
};
