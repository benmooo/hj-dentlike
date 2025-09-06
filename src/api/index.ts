import axios from 'axios'
import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import * as TE from 'fp-ts/TaskEither'
import { useAuthStore } from '@/stores/auth'
import { jwtDecode } from 'jwt-decode'
import { identity } from 'fp-ts'

const baseURL = 'http://192.168.1.199:8050/api'

const api = axios.create({ baseURL })

export const login = async (email: string, password: string) => {
  pipe(
    TE.tryCatch(async () => {
      const { data } = await api.post('/user/login', { loginName: email, password })
      return data
    }, E.toError),

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TE.filterOrElse((data) => (data as any).success, E.toError),
  )
}

// api.interceptors.request.use(async (config) => {
//   const { accessToken, refreshAccessToken } = useAuthStore()
//   return pipe(
//     accessToken,
//     E.fromNullable('No token'),
//     TE.fromEither,
//     TE.flatMap(TE.fromPredicate(jwtIsValid, () => 'Token expired')),
//     // refresh token
//   )
// })

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const { refreshAccessToken } = useAuthStore()
//     const originalRequest = error.config
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true
//       return pipe(
//         refreshAccessToken(),
//         TE.fold(
//           () => error,
//           ({ accessToken: t }) => {
//             api.defaults.headers.common['Authorization'] = `Bearer ${t}`
//             originalRequest.headers['Authorization'] = `Bearer ${t}`
//             // return api(originalRequest)
//           },
//         ),
//       )
//     }
//     return Promise.reject(error)
//   },
// )

export { api }

const jwtIsValid = (token: string): boolean => {
  const now = Date.now()
  const exp = (jwtDecode(token) as { exp?: number }).exp ?? 0
  return exp * 1000 > now
}
