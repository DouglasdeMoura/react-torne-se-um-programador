import { FC } from 'react'

import { classNames as cn } from '~/utils/class-names'

type GridProps = {
  children?: React.ReactNode
} & React.ComponentProps<'div'>

export const Grid: FC<GridProps> = ({ children, className, ...props }) => (
  <div className={cn(['grid', className])} {...props}>
    {children}
  </div>
)
