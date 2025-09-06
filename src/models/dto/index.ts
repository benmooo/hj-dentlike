export interface Hospital {
  id: number
  name: string
  description: string
  isDeleted: boolean
  adress: string
  countryCode: string
}

export interface UserSessionDetails {
  accessToken: string
  userName: string
  userId: number
  hospitals: Hospital[]
  success: boolean
  errorMessage: string
  errorCode: number
}

type ApiResponse<T> = {
  success: boolean
  errorCode: string
  errorMessage?: string
  data?: T
}

type Login = {
  userId: number
  accessToken: string
  userName: string
  hospitals: Hospital[]
}


type LoginResponse = ApiResponse<Login>
type VerifyEmailResponse = ApiResponse<String>
