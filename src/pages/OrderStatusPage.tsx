import { useGetMyOrders } from '@/api/OrderApi';
import OrderStatusDetail from '@/components/order/OrderStatusDetail';
import OrderStatusHeader from '@/components/order/OrderStatusHeader';
import Spinner from '@/components/Spinner';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return <Spinner />;
  }

  if (!orders || orders.length === 0) {
    return 'No orders found';
  }

  return (
    <div className=' border rounded-md shadow-md'>
      {orders.map((order, i) => (
        <>
          <div className='space-y-10 p-10'>
            <OrderStatusHeader order={order} />

            <div className='grid gap-10 md:grid-cols-2'>
              <OrderStatusDetail order={order} />
              <AspectRatio ratio={16 / 5}>
                <img
                  src={order.restaurant.imageUrl}
                  className='rounded-md object-cover h-full w-full'
                />
              </AspectRatio>
            </div>
          </div>
          <span>{i < orders.length - 1 && <Separator />}</span>
        </>
      ))}
    </div>
  );
};

export default OrderStatusPage;
