import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Heading } from './heading'

export default {
  title: 'Components/Heading',
  component: Heading,
} as ComponentMeta<typeof Heading>

const Template: ComponentStory<typeof Heading> = (args) => <Heading {...args} />

export const H1 = Template.bind({})
H1.args = {
  as: 'h1',
  children: 'Heading 1',
}

export const H2 = Template.bind({})
H2.args = {
  as: 'h2',
  children: 'Heading 2',
}

export const H3 = Template.bind({})
H3.args = {
  as: 'h3',
  children: 'Heading 3',
}

export const H4 = Template.bind({})
H4.args = {
  as: 'h4',
  children: 'Heading 4',
}

export const H5 = Template.bind({})
H5.args = {
  as: 'h5',
  children: 'Heading 5',
}

export const H6 = Template.bind({})
H6.args = {
  as: 'h6',
  children: 'Heading 6',
}
