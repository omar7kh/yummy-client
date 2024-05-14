import { SearchState } from '@/pages/SearchPage';
import { Restaurant, RestaurantSearchResponse } from '@/types';
import { useQuery } from 'react-query';

const apiUrl = import.meta.env.VITE_API_URL;

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(`${apiUrl}/api/restaurant/${restaurantId}`);

    if (!response.ok) {
      throw new Error('Failed to get restaurant');
    }

    return response.json();
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

    const response = await fetch(
      `${apiUrl}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error('Failed to get restaurant');
    }

    return response.json();
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

export const useGetRestaurantDetails = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${apiUrl}/api/restaurant/detail/${restaurantId}`
    );

    if (!response.ok) {
      throw new Error('Failed to get restaurant');
    }

    return response.json();
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
