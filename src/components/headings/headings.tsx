import { FC } from 'react'

import { Heading } from '~/components/heading'

type HeadingProps = {
  primary: React.ReactNode
  secondary?: React.ReactNode
} & React.ComponentProps<'header'>

export const Headings: FC<HeadingProps> = ({
  primary,
  secondary,
  ...props
}) => (
  <header className="headings" {...props}>
    <Heading>{primary}</Heading>
    {secondary && <Heading as="h2">{secondary}</Heading>}
  </header>
)
