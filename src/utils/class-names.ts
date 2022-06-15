type ClassName = string | boolean | undefined

export const classNames = (classNames: ClassName[]) =>
  classNames.filter((className) => Boolean(className)).join(' ')
