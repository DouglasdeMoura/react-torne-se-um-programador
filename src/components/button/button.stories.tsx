import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from './button'

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Button',
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'Button',
  variant: 'secondary',
}

export const Contrast = Template.bind({})
Contrast.args = {
  children: 'Button',
  variant: 'contrast',
}

export const OulinePrimary = Template.bind({})
OulinePrimary.args = {
  children: 'Button',
  outlined: true,
}

export const OutlineSecondary = Template.bind({})
OutlineSecondary.args = {
  children: 'Button',
  variant: 'secondary',
  outlined: true,
}

export const OutlineContrast = Template.bind({})
OutlineContrast.args = {
  children: 'Button',
  variant: 'contrast',
  outlined: true,
}

export const DisabledPrimary = Template.bind({})
DisabledPrimary.args = {
  children: 'Button',
  disabled: true,
}

export const DisabledSecondary = Template.bind({})
DisabledSecondary.args = {
  children: 'Button',
  variant: 'secondary',
  disabled: true,
}

export const DisabledContrast = Template.bind({})
DisabledContrast.args = {
  children: 'Button',
  variant: 'contrast',
  disabled: true,
}

export const DisabledOulinePrimary = Template.bind({})
DisabledOulinePrimary.args = {
  children: 'Button',
  outlined: true,
  disabled: true,
}

export const DisabledOutlineSecondary = Template.bind({})
DisabledOutlineSecondary.args = {
  children: 'Button',
  variant: 'secondary',
  disabled: true,
  outlined: true,
}

export const DisabledOutlineContrast = Template.bind({})
DisabledOutlineContrast.args = {
  children: 'Button',
  variant: 'contrast',
  outlined: true,
  disabled: true,
}
