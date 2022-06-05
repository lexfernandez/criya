import { ComponentMeta, ComponentStory } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Product from "../../models/product.model";
import Home from "../../pages";
import { rest } from "msw";
import furnitures from '../../fixtures/furnitures.json'
const queryClient = new QueryClient();

export default {
  title: "Pages/Home",
  component: Home,
  argTypes: { onClick: { action: true } },
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
        furnitures: [
          rest.get<Product[]>('*/api/furnitures',(req,res,ctx)=>{
            return res(
              ctx.status(200),
              ctx.json(furnitures)
            )
          })
        ]
      }
    }
  }
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = (args) => <Home {...args} />;

export const Default = Template.bind({});
Default.args = {};
