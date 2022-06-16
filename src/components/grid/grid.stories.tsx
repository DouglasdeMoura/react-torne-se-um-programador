import { useState } from 'react'

import { ComponentMeta } from '@storybook/react'

import { Button } from '../button'
import { Grid } from './grid'

export default {
  title: 'Components/Grid',
  component: Grid,
} as ComponentMeta<typeof Grid>

export const Default = () => {
  const [columns, setColumns] = useState([1, 2, 3, 4])

  return (
    <>
      <Grid>
        {columns.map((number) => (
          <div
            key={number}
            style={{
              background: 'hsl(205deg, 20%, 94%)',
              borderRadius: '0.25rem',
              padding: '.5rem',
              textAlign: 'center',
            }}
          >
            {number}
          </div>
        ))}
      </Grid>
      <Grid style={{ marginTop: '1rem' }}>
        <Button
          outlined
          onClick={() => setColumns([...columns, columns.length])}
        >
          Add column
        </Button>
        <Button
          variant="secondary"
          outlined
          onClick={() => setColumns([...columns].slice(0, -1))}
        >
          Remove column
        </Button>
      </Grid>
    </>
  )
}
