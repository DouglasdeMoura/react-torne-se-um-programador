import { FC } from 'react'

type DropdownProps = {
  title: React.ReactNode
  isButton?: boolean
  options: React.ReactNode[]
}

export const Dropdown: FC<DropdownProps> = ({ isButton, title, options }) => {
  const summaryProps = {} as { role?: 'button' }

  if (isButton) {
    summaryProps.role = 'button'
  }

  return (
    <details role="list">
      <summary aria-haspopup="listbox" {...summaryProps}>
        {title}
      </summary>
      <ul role="listbox">
        {options?.map((option) => (
          <li key={option?.toString()}>{option}</li>
        ))}
      </ul>
    </details>
  )
}
