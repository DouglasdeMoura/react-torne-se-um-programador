import { FC } from 'react'

type AccordionProps = {
  title: React.ReactNode
  children: React.ReactNode
}

export const Accordion: FC<AccordionProps> = ({ children, title }) => (
  <details>
    <summary>{title}</summary>
    {children}
  </details>
)
