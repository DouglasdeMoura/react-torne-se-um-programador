import { FC } from 'react'

import { classNames as cn } from '~/utils/class-names'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'contrast'
  outlined?: boolean
  loading?: boolean
} & React.ComponentProps<'button'>

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  outlined,
  className,
  loading,
  ...props
}) => (
  <button
    aria-busy={loading}
    className={cn([className, variant, outlined && 'outline'])}
    {...props}
  >
    {children}
  </button>
)
