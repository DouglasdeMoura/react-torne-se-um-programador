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

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Label',
  disabled: true,
}

export const Readonly = Template.bind({})
Readonly.args = {
  label: 'Label',
  defaultValue: 'Read-only value',
  readOnly: true,
}

export const Examples = () => (
  <>
    <Input label="Simple input" />
    <Input label="Passing an ID" id="passing_an_id" />
    <Input label="Required input" error="This input is required" required />
    <Input
      label="minLength validation (5 characters)"
      error="The minLength is 5"
      defaultValue="1234"
      minLength={5}
    />
    <Input
      label="maxLength validation (5 characters)"
      error="The maxLength is 5"
      defaultValue="1234567"
      maxLength={5}
    />
    <Input
      label="Enter 3 numbers"
      error="You must enter three numbers"
      pattern="[0-9]{3}"
    />
    <Input
      label="Enter a number between 3 and 5"
      error="You must enter a number between 3 and 5"
      type="number"
      min={3}
      max={5}
    />
    <Input
      label="Custom validation"
      help="Type ABC"
      error="Custom error"
      custom={(value) => value === 'ABC'}
    />
    <Input label="Required" error="Required" required />
    <Input label="Email" error="Required" type="email" />
    <Input
      label="Date"
      help="mm/dd/yyyy"
      maxLength={10}
      mask={(value) =>
        value
          .replace(/\D+/g, '')
          .replace(/(\d{2})(\d)/, '$1/$2')
          .replace(/(\/\d{2})(\d)/, '$1/$2')
          .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
      }
      inputMode="numeric"
      pattern="\d{2}/\d{2}/\d{4}"
    />
  </>
)
