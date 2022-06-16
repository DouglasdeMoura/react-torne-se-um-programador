import { ComponentStory, ComponentMeta } from '@storybook/react'

import { HorizontalScroller } from './horizontal-scroller'

export default {
  title: 'Components/HorizontalScroller',
  component: HorizontalScroller,
} as ComponentMeta<typeof HorizontalScroller>

const Table = () => (
  <table role="grid">
    <thead>
      <tr>
        <th>Device</th>
        <th>Extra&nbsp;small</th>
        <th>Small</th>
        <th>Medium</th>
        <th>Large</th>
        <th>Extra&nbsp;large</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Breakpoint</th>
        <td>
          &lt;576<small>px</small>
        </td>
        <td>
          ≥576<small>px</small>
        </td>
        <td>
          ≥768<small>px</small>
        </td>
        <td>
          ≥992<small>px</small>
        </td>
        <td>
          ≥1200<small>px</small>
        </td>
      </tr>
      <tr>
        <th>Viewport</th>
        <td>
          100<small>%</small>
        </td>
        <td>
          540<small>px</small>
        </td>
        <td>
          720<small>px</small>
        </td>
        <td>
          960<small>px</small>
        </td>
        <td>
          1140<small>px</small>
        </td>
      </tr>
    </tbody>
  </table>
)

const Template: ComponentStory<typeof HorizontalScroller> = (args) => (
  <HorizontalScroller {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  children: <Table />,
}
