import { Order, Restaurant } from '@/types';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

// CREATE MY RESTAURANT
export const useCreateMyRestaurant = () => {
  const createRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const response = await axios.post(
      `${API_URL}/api/my/restaurant`,
      restaurantFormData,
      { withCredentials: true }
    );

    if (response.status !== 201) {
      throw new Error('Failed to create restaurant');
    }

    return response.data;
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createRestaurantRequest);

  if (isSuccess) {
    toast.success('Restaurant created!');
  }

  if (error) {
    toast.error('Unable to update restaurant');
  }

  return { createRestaurant, isLoading };
};

// GET MY RESTAURANT
export const useGetMyRestaurant = () => {
  const getRestaurantRequest = async (): Promise<Restaurant> => {
    const response = await axios.get(`${API_URL}/api/my/restaurant`, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error('Failed to get restaurant');
    }
    return response.data;
  };

  const { data: restaurant, isLoading } = useQuery(
    'fetchRestaurant',
    getRestaurantRequest
  );

  return { restaurant, isLoading };
};

// UPDATE MY RESTAURANT
export const useUpdateMyRestaurant = () => {
  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const response = await axios.put(
      `${API_URL}/api/my/restaurant`,
      restaurantFormData,
      { withCredentials: true }
    );

    if (!response) {
      throw new Error('Failed to update restaurant');
    }

    return response.data;
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateRestaurantRequest);

  if (isSuccess) {
    toast.success('Restaurant Updated');
  }

  if (error) {
    toast.error('Unable to update restaurant');
  }

  return { updateRestaurant, isLoading };
};

// GET MY RESTAURANT ORDERS
export const useGetMyRestaurantOrders = () => {
  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const response = await axios.get(`${API_URL}/api/my/restaurant/order`, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch orders');
    }

    return response.data;
  };

  const { data: orders, isLoading } = useQuery(
    'fetchMyRestaurantOrders',
    getMyRestaurantOrdersRequest
  );

  return { orders, isLoading };
};

// UPDATE MY RESTAURANT ORDERS
export const useUpdateMyRestaurantOrder = () => {
  const updateMyRestaurantOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const response = await axios.put(
      `${API_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
      { status: updateStatusOrderRequest.status },
      { withCredentials: true }
    );

    if (response.status !== 200) {
      throw new Error('Failed to update status');
    }

    return response.data;
  };

  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyRestaurantOrder);

  if (isSuccess) {
    toast.success('Order updated');
  }

  if (isError) {
    toast.error('Unable to update order');
    reset();
  }

  return { updateRestaurantStatus, isLoading };
};
