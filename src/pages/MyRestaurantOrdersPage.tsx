import { useGetMyRestaurantOrders } from '@/api/MyRestaurantApi';
import Spinner from '@/components/Spinner';
import OrderItem from '@/components/order/OrderItem';

const MyRestaurantOrdersPage = () => {
  const { orders, isLoading } = useGetMyRestaurantOrders();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h2 className='text-2xl font-bold mb-4'>
        {orders?.length} Active orders
      </h2>

      <div className='flex-1 space-y-5'>
        {orders?.map((order) => (
          <OrderItem order={order} />
        ))}
      </div>
    </>
  );
};

export default MyRestaurantOrdersPage;
