import { FC, forwardRef } from 'react'

import { classNames as cn } from '~/utils/class-names'

type ButtonProps = {
  children?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'contrast'
  outlined?: boolean
  loading?: boolean
} & React.ComponentPropsWithRef<'button'>

export const Button: FC<ButtonProps> = forwardRef(
  (
    { children, variant = 'primary', outlined, className, loading, ...props },
    ref,
  ) => (
    <button
      aria-busy={loading}
      className={cn([className, variant, outlined && 'outline'])}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  ),
)

Button.displayName = 'Button'
