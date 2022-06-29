export const serializeFormData = (element: HTMLFormElement) => {
  const formData = new FormData(element)

  return Object.fromEntries(formData.entries())
}
