import { User } from '@/types';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_BASE_URL;

type CreateUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type Login = {
  email: string;
  password: string;
};

// CREATE USER
export const useCreateUser = () => {
  const createUserRequest = async (userFormData: CreateUser) => {
    const response = await axios.post(
      `${API_URL}/api/user/sign-up`,
      userFormData,
      { withCredentials: true }
    );

    if (response.status !== 201) {
      console.log(response.data);

      throw new Error('Failed to create User');
    }

    return response.data;
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isSuccess,
  } = useMutation(createUserRequest, {
    onSuccess: () => {
      toast.success('User created successfully');
    },
    onError: () => {
      toast.error('Failed to create User');
    },
  });

  return { createUser, isLoading, isSuccess };
};

// LOGIN USER
export const useLoginUser = () => {
  const createLoginRequest = async (userFormData: Login) => {
    const response = await axios.post(
      `${API_URL}/api/user/login`,
      userFormData,
      { withCredentials: true }
    );

    if (response.status !== 200) {
      throw new Error('Failed to Login');
    }

    localStorage.setItem('UserInfo', JSON.stringify(response.data));

    return response.data;
  };

  const {
    mutateAsync: LoginUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation(createLoginRequest, {
    onSuccess: () => {
      toast.success('Logged in successfully');
    },
    onError: () => {
      toast.error('Failed to Login');
    },
  });

  return { LoginUser, isLoading, isSuccess, isError, error };
};

// UPDATE USER
export const useUpdateUser = () => {
  const updateUserRequest = async (userFormData: User) => {
    const response = await axios.put(`${API_URL}/api/user`, userFormData, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error('Failed to Update User');
    }

    localStorage.removeItem('UserInfo');
    localStorage.setItem('UserInfo', JSON.stringify(response.data));

    return response.data;
  };

  const {
    mutateAsync: updatedUser,
    isLoading,
    reset,
  } = useMutation(updateUserRequest, {
    onSuccess: () => {
      toast.success('User updated successfully');
    },
    onError: () => {
      toast.error('Failed to Update User');
      reset();
    },
  });

  return { updatedUser, isLoading };
};

// LOGOUT USER
export const useLogoutUser = () => {
  const logoutUserRequest = async () => {
    const response = await axios.post(
      `${API_URL}/api/user/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to Logout');
    }

    return response.data;
  };

  const {
    mutate: logoutUser,
    isLoading,
    isSuccess,
  } = useMutation(logoutUserRequest, {
    onSuccess: () => {
      toast.success('Logged out');
    },
    onError: () => {
      toast.error('Failed to Logout');
    },
  });

  return { logoutUser, isLoading, isSuccess };
};

export const useGetCurrentUser = () => {
  const getCurrentUserRequest = async () => {
    const response = await axios.get(`${API_URL}/api/user`, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error('Failed to Get Current User');
    }

    return response.data;
  };

  const { data: currentUser, isLoading } = useQuery(
    'currentUser',
    getCurrentUserRequest
  );

  return { currentUser, isLoading };
};
