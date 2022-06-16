import { FC } from 'react'

import { classNames as cn } from '~/utils/class-names'

type ContainerProps = {
  children?: React.ReactNode
  fluid?: boolean
}

const getContainerClass = (fluid?: boolean) =>
  fluid ? 'container-fluid' : 'container'

const getClassName = (fluid?: boolean, className?: string) =>
  cn([getContainerClass(fluid), className])

export const Container: FC<ContainerProps & React.ComponentProps<'div'>> = ({
  children,
  className,
  fluid,
}) => <div className={getClassName(fluid, className)}>{children}</div>

export const Header: FC<ContainerProps & React.ComponentProps<'header'>> = ({
  children,
  className,
  fluid,
}) => <header className={getClassName(fluid, className)}>{children}</header>

export const Main: FC<ContainerProps & React.ComponentProps<'main'>> = ({
  children,
  className,
  fluid,
}) => <main className={getClassName(fluid, className)}>{children}</main>

export const Section: FC<ContainerProps & React.ComponentProps<'section'>> = ({
  children,
  className,
  fluid,
}) => <div className={getClassName(fluid, className)}>{children}</div>

export const Footer: FC<ContainerProps & React.ComponentProps<'footer'>> = ({
  children,
  className,
  fluid,
}) => <footer className={getClassName(fluid, className)}>{children}</footer>
