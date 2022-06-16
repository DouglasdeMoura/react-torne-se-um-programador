import { FC } from 'react'

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type HeadingProps<T extends React.ElementType> = {
  children?: React.ReactNode
  as?: HeadingElement
} & React.ComponentProps<T>

export const Heading: FC<HeadingProps<HeadingElement>> = ({
  as,
  children,
  ...props
}) => {
  const Tag = as || 'h1'
  return <Tag {...props}>{children}</Tag>
}
