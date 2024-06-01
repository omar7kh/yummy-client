import axios from 'axios';
import { useQuery } from 'react-query';

const API_URL = import.meta.env.VITE_BASE_URL;

export const useCheckAuth = () => {
  const checkAuthRequest = async () => {
    const response = await axios.get(`${API_URL}/api/user/auth`, {
      withCredentials: true,
    });

    return response;
  };

  const {
    data: isAuth,
    isLoading,
    isError,
  } = useQuery('checkAuth', checkAuthRequest);

  return { isAuth, isLoading, isError };
};
