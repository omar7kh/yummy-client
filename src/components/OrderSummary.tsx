import { CartItem } from '@/pages/RestaurantDetailPage';
import { Restaurant } from '@/types';
import { CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Trash } from 'lucide-react';

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
  const getTotalCost = () => {
    const totalPrice = cartItems.reduce((total, cartItem) => {
      return total + cartItem.price * cartItem.quantity;
    }, 0);

    const totalPriceWithDelivery =
      totalPrice > 1 ? totalPrice + restaurant.deliveryPrice : 0;

    return (totalPriceWithDelivery / 100).toFixed(2);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className='text-2xl font-bold flex justify-between'>
          <span>Your order</span>
          <span>{getTotalCost()} €</span>
        </CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col gap-5'>
        {cartItems.map((cartItem) => (
          <div className='flex justify-between'>
            <span>
              <Badge variant='outline' className='mr-2'>
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>

            <span className='flex items-center gap-1'>
              {`${(cartItem.price / 100).toFixed(2)} €`}
              {
                <Trash
                  size={20}
                  className='text-red-500 cursor-pointer'
                  onClick={() => removeFromCart(cartItem)}
                />
              }
            </span>
          </div>
        ))}

        <Separator />

        <div className='flex justify-between'>
          <span>Delivery</span>
          <span>{(restaurant.deliveryPrice / 100).toFixed(2)} €</span>
        </div>

        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
