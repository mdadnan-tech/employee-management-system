import axios from 'axios';
const AUTH_API =
  `${import.meta.env.VITE_API_URL}/auth/api/login`;
class AuthService
{
    login(user)
    {
        return axios.post(AUTH_API,user);
    }
}
export default new AuthService();
