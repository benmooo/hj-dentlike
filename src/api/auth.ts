import axios from 'axios'
export const refreshToken = async () => {
  const response = await axios.post('/api/auth/refresh-token', null, { withCredentials: true })
  return response.data
}
