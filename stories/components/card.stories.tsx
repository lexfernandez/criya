import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "../../components/card";

export default {
  title: "Components/Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <div>Card</div>
      <div>Card</div>
    </>
  ),
};

export const Hovered = Template.bind({});
Hovered.args = { ...Default.args };
Hovered.parameters = { pseudo: { hover: true } };
