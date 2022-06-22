import { FC, forwardRef, useRef, useState } from 'react'

import useMergedRef from '@react-hook/merged-ref'

type Errors = {
  type?: string
  minLength?: string
  maxLength?: string
  min?: string
  max?: string
  pattern?: string
  required?: string
  custom?: string
}

type ValidationResult = {
  valid: boolean
  errors?: {
    type: keyof Errors
    message: string
  }[]
}

type ErrorMessages = string | Errors

function validate(
  props: Pick<
    InputProps,
    | 'required'
    | 'minLength'
    | 'maxLength'
    | 'pattern'
    | 'type'
    | 'min'
    | 'max'
    | 'custom'
  >,
  element: React.RefObject<HTMLInputElement>,
  messages?: ErrorMessages,
): ValidationResult {
  const validators = {
    required: element.current?.validity.valueMissing,
    minLength:
      element.current?.validity.tooShort ||
      (props?.minLength && element!.current!.value.length < props.minLength),
    maxLength:
      element.current?.validity.tooLong ||
      (props?.maxLength && element!.current!.value.length > props.maxLength),
    pattern: element.current?.validity.patternMismatch,
    type: element.current?.validity.typeMismatch,
    min:
      element.current?.validity.rangeUnderflow ||
      (props?.min && Number(element!.current!.value) < props.min),
    max:
      element.current?.validity.rangeOverflow ||
      (props?.max && Number(element!.current!.value) > props.max),
    custom: props?.custom && !props.custom?.(element!.current!.value),
  }

  const errors: ValidationResult['errors'] = []

  for (const [validation, invalid] of Object.entries(validators)) {
    if (invalid) {
      errors.push({
        type: validation as keyof Errors,
        message:
          (typeof messages === 'object'
            ? messages[validation as keyof Errors]
            : messages) || '',
      })
    }
  }

  if (errors.length > 0) {
    return {
      valid: false,
      errors,
    }
  }

  return { valid: true }
}

type InputProps = {
  label: React.ReactNode
  error?: ErrorMessages
  mask?: (value: string) => string
  custom?: (value: string) => boolean
  onError?: (value: string, errors: ValidationResult['errors']) => void
  onValidate?: (value: string) => void
} & React.ComponentPropsWithRef<'input'>

export const Input: FC<InputProps> = forwardRef(
  (
    {
      label,
      custom,
      error,
      mask,
      onBlur,
      onChange,
      onError,
      onValidate,
      id,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [valid, setValid] = useState<boolean | undefined>()
    const [errors, setErrors] = useState<
      ValidationResult['errors'] | undefined
    >()

    const validation = () => {
      if (errors) {
        return {
          'aria-invalid': true,
        }
      }

      if (valid) {
        return {
          'aria-invalid': false,
        }
      }

      return {}
    }

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e)

      const validation = validate({ custom, ...props }, inputRef, error)

      if (!validation.valid) {
        setErrors(validation.errors)
        onError?.(inputRef.current?.value || '', errors || [])
        return
      }

      setValid(true)

      onValidate?.(inputRef.current?.value || '')
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)

      if (mask && typeof mask === 'function') {
        inputRef!.current!.value = mask(e.target.value)
      }

      if (errors) {
        setErrors(undefined)
        setValid(false)
      }
    }

    return (
      <>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          ref={useMergedRef(ref, inputRef)}
          {...validation()}
          {...props}
        />
        {errors?.map((err) => (
          <small key={err.type}>{err.message}</small>
        ))}
      </>
    )
  },
)

Input.displayName = 'Input'
