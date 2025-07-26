import { ref } from 'vue'
import { defineStore } from 'pinia'
import TE from 'fp-ts/lib/TaskEither'
import E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { refreshToken } from '@/api/auth'
import { identity } from 'fp-ts'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)

  function setAccessToken(token: string) {
    accessToken.value = token
  }

  function clearAccessToken() {
    accessToken.value = null
  }

  const refreshAccessToken = () =>
    pipe(
      TE.tryCatch(async () => await refreshToken(), E.toError),
      TE.chainEitherK((data: { accessToken: string }) => {
        setAccessToken(data.accessToken)
        return E.right(data)
      }),
      TE.orElse((error) => {
        clearAccessToken()
        return TE.left(error)
      }),
    )

  return { accessToken, setAccessToken, clearAccessToken, refreshAccessToken }
})
