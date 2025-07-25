import * as v from 'valibot'

export const signupPayload = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.minLength(1, 'Name is required')),
    email: v.pipe(v.string(), v.email('Invalid email address')),
    phoneNumber: v.pipe(v.string(), v.minLength(1, 'Phone number is required')),
    practiceName: v.pipe(v.string(), v.minLength(1, 'Practice name is required')),
    password: v.pipe(v.string(), v.minLength(8, 'Password must be at least 8 characters long')),
    passwordConfirmation: v.pipe(v.string(), v.minLength(8, 'Password confirmation is required')),
    address: v.pipe(v.string(), v.minLength(1, 'Address is required')),
    suburb: v.pipe(v.string(), v.minLength(1, 'Suburb is required')),
    state: v.pipe(v.string(), v.minLength(1, 'State is required')),
    postcode: v.pipe(v.string(), v.minLength(1, 'Postcode is required')),
    country: v.pipe(v.object({ value: v.string(), label: v.string() })),
  }),
  v.forward(
    v.partialCheck(
      [['password'], ['passwordConfirmation']],
      (input) => input.password === input.passwordConfirmation,
      "Passwords don't match",
    ),
    ['passwordConfirmation'],
  ),
)

export type SignupPayload = v.InferOutput<typeof signupPayload>
