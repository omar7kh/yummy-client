import { Order, OrderStatus } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { orderStatus } from '@/config/order-status-config';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { useUpdateMyRestaurantOrder } from '@/api/MyRestaurantApi';

type Props = {
  order: Order;
};

const OrderItem = ({ order }: Props) => {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder();

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateRestaurantStatus({
      orderId: order._id as string,
      status: newStatus,
    });
    setStatus(newStatus);
  };

  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);

    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='grid md:grid-cols-4 gap-4 justify-between mb-3'>
          <div>
            Customer Name:
            <span className='ml-2 font-normal'>
              {`${order.deliveryDetails.firstName} ${order.deliveryDetails.lastName}`}
            </span>
          </div>
          <div>
            Delivery address:
            <span className='ml-2 font-normal'>
              {order.deliveryDetails.address.street},{' '}
              {order.deliveryDetails.address.city}
            </span>
          </div>
          <div>
            Time:
            <span className='ml-2 font-normal'>{getTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className='ml-2 font-normal'>
              {(order.totalAmount / 100).toFixed(2)} €
            </span>
          </div>
        </CardTitle>

        <Separator />
      </CardHeader>

      <CardContent className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          {order.cartItems.map((cartItem) => (
            <span>
              <Badge variant='outline' className='mr-2'>
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='status'>What is the status of this order?</Label>
          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          >
            <SelectTrigger id='status' className='w-[270px]'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              {orderStatus.map((status) => (
                <SelectItem value={status.value}>{status.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
