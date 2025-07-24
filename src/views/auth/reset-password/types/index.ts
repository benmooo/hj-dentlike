import {
  object,
  string,
  minLength,
  pipe,
  type InferOutput,
  forward,
  partialCheck,
  email,
  regex,
  array,
  number,
  length,
} from 'valibot'

export const resetPasswordPayload = pipe(
  object({
    password: pipe(string(), minLength(8, 'Password must be at least 8 characters')),
    passwordConfirm: pipe(string(), minLength(8, 'Password must be at least 8 characters')),
  }),

  forward(
    partialCheck(
      [['password'], ['passwordConfirm']],
      (input) => input.password === input.passwordConfirm,
      'Passwords do not match',
    ),
    ['passwordConfirm'],
  ),
)
export type ResetPasswordPayload = InferOutput<typeof resetPasswordPayload>

export const emailSchema = object({
  email: pipe(string(), email('Invalid email')),
})

export type EmailSchema = InferOutput<typeof emailSchema>

export const otpSchema = object({
  otp: pipe(array(number()), length(6, 'code must contain exactly 6 digits.')),
})

export type OTPSchema = InferOutput<typeof otpSchema>
