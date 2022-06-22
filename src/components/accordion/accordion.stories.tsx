import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Accordion } from './accordion'

export default {
  title: 'Components/Accordion',
  component: Accordion,
} as ComponentMeta<typeof Accordion>

const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  title: 'Accordion 1',
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna diam, tincidunt nec porta sed, auctor id velit. Etiam venenatis nisl ut orci consequat, vitae tempus quam commodo. Nulla non mauris ipsum. Aliquam eu posuere orci. Nulla convallis lectus rutrum quam hendrerit, in facilisis elit sollicitudin. Mauris pulvinar pulvinar mi, dictum tristique elit auctor quis. Maecenas ac ipsum ultrices, porta turpis sit amet, congue turpis.',
}
