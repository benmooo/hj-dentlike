import * as v from 'valibot'

export const loginPayload = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters')),
})

export type LoginPayload = v.InferOutput<typeof loginPayload>
