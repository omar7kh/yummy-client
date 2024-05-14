import {
  useCreateRestaurant,
  useGetRestaurant,
  useUpdateRestaurant,
} from '@/api/MyRestaurantApi';
import RestaurantForm from '@/forms/restaurantForm/RestaurantForm';

const RestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateRestaurant();
  const { restaurant } = useGetRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateRestaurant();

  const isEditing = !!restaurant;

  return (
    <RestaurantForm
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
      restaurant={restaurant}
    />
  );
};

export default RestaurantPage;
