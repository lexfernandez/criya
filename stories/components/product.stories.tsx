import { ComponentMeta, ComponentStory } from "@storybook/react";
import { rest } from "msw";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductItem from "../../components/product-item";
import Vendor from "../../models/vendors.model";
import vendor from '../../fixtures/vendor.json'
const queryClient = new QueryClient();

export default {
  title: "Components/Product Item",
  component: ProductItem,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters:{
    msw:{
      handlers:{
        vendors: [
          rest.get<Vendor[]>('*/api/vendors/*',(req,res,ctx)=>{
            return res(
              ctx.status(200),
              ctx.json(vendor)
            )
          })
        ]
      }
    }
  }
} as ComponentMeta<typeof ProductItem>;

const Template: ComponentStory<typeof ProductItem> = (args) => (
  <ProductItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  product: {
    id: "someid",
    name: "Matted Wood Frame",
    description:
      "a beautifule frame made of wookd and painted with black matted paint of the best quality",
    unitCost: 20.502,
    inStock: true,
    colors: [
      "Red",
      "Orange",
      "Yellow",
      "Green",
      "Blue purple",
      "Velvet",
      "Gold",
      "Silver",
      "Brown",
      "Black",
      "White",
      "Matte black",
      "Shiny black",
      "Grey",
      "Framboise",
      "Fern",
      "Taupe",
      "Cherry",
      "Cream",
      "Beige",
      "Blue",
    ],
    vendors: ["rec8116cdd76088af"],
    images: [
      {
        id: "attzPYQlRQIaZC2gi",
        width: 1000,
        height: 664,
        url: "https://dl.airtable.com/.attachments/f026e3efd17cba2d1b9edfb73cd1d955/deb749bf/photo-1557374669-d1f478dc92c4ixlibrb-1.2.1ixideyJhcHBfaWQiOjEyMDd9autoformatfitcropw1000q80?ts=1654317990&userId=usrnsmHONxFRtHt8S&cs=3306ec42bd376ce4https://dl.airtable.com/.attachments/1d5da6ab7b5aaa85422470df41f4028f/41f6cfaf/photo-1543248939-4296e1fea89bixlibrb-1.2.1ixideyJhcHBfaWQiOjEyMDd9w1000q80?ts=1654356065&userId=usrnsmHONxFRtHt8S&cs=3f2b4d0e904d2d9b",
        thumbnails: {
          "small":{
            url: "https://dl.airtable.com/.attachmentThumbnails/0bfc00bcc317b91ede93541ac9992c6e/e2d95a38?ts=1654356065&userId=usrnsmHONxFRtHt8S&cs=a0208835cb3df269",
            width: 54,
            height: 36,
          },
          "medium":{
            url: "https://dl.airtable.com/.attachmentThumbnails/7a3b89cd44914b9db86eb00357471871/e66c4135?ts=1654356065&userId=usrnsmHONxFRtHt8S&cs=dd5c184626ddce5c",
            width: 771,
            height: 512,
          },
          "large":{
            url: "https://dl.airtable.com/.attachmentThumbnails/5bea028b2b1ffaa3f810d733ce86eea8/07c4361c?ts=1654356065&userId=usrnsmHONxFRtHt8S&cs=45e7382aa3abe89c",
            width: 3000,
            height: 3000,
          },
        },
      },
    ],
  },
};

export const Hovered = Template.bind({});
Hovered.args = { ...Default.args };
Hovered.parameters = { pseudo: { hover: true } };
