import { FC } from 'react'

type HorizontalScroller = {
  children?: React.ReactNode
} & React.ComponentProps<'figure'>

export const HorizontalScroller: FC<HorizontalScroller> = ({
  children,
  ...props
}) => <figure {...props}>{children}</figure>
