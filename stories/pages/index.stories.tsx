import { ComponentMeta, ComponentStory} from '@storybook/react'
import Home from '../../pages'

export default {
    title: 'Pages/Home',
    component: Home,
    argTypes: {onClick: {action:true}}
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = (args) => <Home {...args} />

export const Default = Template.bind({});