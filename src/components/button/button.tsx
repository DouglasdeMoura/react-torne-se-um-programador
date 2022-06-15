import { FC } from 'react'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'contrast'
  outlined?: boolean
} & React.ComponentProps<'button'>

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  outlined,
  className,
  ...props
}) => (
  <button
    className={[className, variant, outlined && 'outline']
      .filter((className) => Boolean(className))
      .join(' ')}
    {...props}
  >
    {children}
  </button>
)
