import { Order } from '@/types';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BASE_URL;

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    firstName: string;
    lastName: string;
    address: {
      street: string;
      city: string;
    };
  };
  restaurantId: string;
};

export const useGetMyOrders = () => {
  const getMyOrdersRequest = async (): Promise<Order[]> => {
    const response = await axios.get(`${apiUrl}/api/order`, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error('Failed to get orders');
    }

    return response.data;
  };

  const { data: orders, isLoading } = useQuery(
    'fetchMyOrders',
    getMyOrdersRequest,
    {
      refetchInterval: 5000,
    }
  );

  return { orders, isLoading };
};

export const useCreateCheckoutSession = () => {
  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const response = await axios.post(
      `${apiUrl}/api/order/checkout/create-checkout-session`,
      checkoutSessionRequest,
      { withCredentials: true }
    );

    if (response.status !== 200) {
      throw new Error('Unable to create checkout session');
    }

    return response.data;
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest);

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    createCheckoutSession,
    isLoading,
  };
};
