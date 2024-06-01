import { SearchState } from '@/pages/SearchPage';
import { Restaurant, RestaurantSearchResponse } from '@/types';
import axios from 'axios';
import { useQuery } from 'react-query';

const apiUrl = import.meta.env.VITE_BASE_URL;

// GET RESTAURANTS
export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await axios.get(
      `${apiUrl}/api/restaurant/${restaurantId}`
    );

    if (response.status !== 200) {
      throw new Error('Failed to get restaurant');
    }

    return response.data;
  };

  const { data: restaurant, isLoading } = useQuery(
    'fetchRestaurant',
    getRestaurantByIdRequest,
    {
      enabled: !!restaurantId,
    }
  );

  return { restaurant, isLoading };
};

// SEARCH RESTAURANT
export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set('searchQuery', searchState.searchQuery);
    params.set('page', searchState.page.toString());
    params.set('selectedCuisines', searchState.selectedCuisines.join(','));
    params.set('sortOption', searchState.sortOption);

    const response = await axios.get(
      `${apiUrl}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (response.status !== 200) {
      throw new Error('Failed to get restaurant');
    }

    return response.data;
  };

  const { data: results, isLoading } = useQuery(
    ['searchRestaurants', searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};

// GET RESTAURANT DETAILS
export const useGetRestaurantDetails = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await axios.get(
      `${apiUrl}/api/restaurant/detail/${restaurantId}`
    );

    if (response.status !== 200) {
      throw new Error('Failed to get restaurant');
    }

    return response.data;
  };

  const { data: restaurant, isLoading } = useQuery(
    'fetchRestaurant',
    getRestaurantByIdRequest,
    {
      enabled: !!restaurantId,
    }
  );

  return { restaurant, isLoading };
};
