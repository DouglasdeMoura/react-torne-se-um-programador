import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Headings } from './headings'

export default {
  title: 'Components/Headings',
  component: Headings,
} as ComponentMeta<typeof Headings>

const Template: ComponentStory<typeof Headings> = (args) => (
  <Headings {...args} />
)

export const Default = Template.bind({})
Default.args = {
  primary: 'Heading 1',
  secondary: 'Heading 2',
}

export const Secondary = Template.bind({})
Secondary.args = {
  primary: 'Heading 1',
}
