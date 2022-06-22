import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Input } from './input'

export default {
  title: 'Components/Input',
  component: Input,
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Label',
}

export const Valid = Template.bind({})
Valid.args = {
  label: 'Label',
  'aria-invalid': 'false',
}

export const Invalid = Template.bind({})
Invalid.args = {
  label: 'Label',
  'aria-invalid': 'true',
}
