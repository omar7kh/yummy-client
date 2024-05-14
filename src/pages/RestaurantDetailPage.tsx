import { useCreateCheckoutSession } from '@/api/OrderApi';
import { useGetRestaurantDetails } from '@/api/RestaurantApi';
import CheckoutButton from '@/components/CheckoutButton';
import MenuItems from '@/components/MenuItems';
import OrderSummary from '@/components/OrderSummary';
import RestaurantInfo from '@/components/RestaurantInfo';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardFooter } from '@/components/ui/card';
import { UserFormData } from '@/forms/userProfileForm/UserProfileForm';
import { MenuItem } from '@/types';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const RestaurantDetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurantDetails(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prevCartItem) => {
      const existingCartItem = prevCartItem.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItem;

      if (existingCartItem) {
        updatedCartItem = prevCartItem.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItem = [
          ...prevCartItem,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItem)
      );

      return updatedCartItem;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    console.log(userFormData);

    if (!restaurant) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),

      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        email: userFormData.email as string,
        address: {
          street: userFormData.address.street,
          city: userFormData.address.city,
          country: userFormData.address.country,
        },
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  if (isLoading || !restaurant) {
    return <span>loading...</span>;
  }

  return (
    <div className='flex flex-col gap-10'>
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          alt={`${restaurant.restaurantName} restaurant Image`}
          className='w-full h-full object-cover rounded-md'
        />
      </AspectRatio>

      <div className='grid gap-5 md:grid-cols-[4fr,2fr] md:px-32'>
        <div className='flex flex-col gap-4'>
          <RestaurantInfo restaurant={restaurant} />

          <span className='text-2xl font-bold tracking-tight'>Menu</span>

          {restaurant.menuItems.map((menuItem) => (
            <MenuItems
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
