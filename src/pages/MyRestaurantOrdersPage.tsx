import { useGetRestaurantOrders } from '@/api/MyRestaurantApi';
import OrderItem from '@/components/OrderItem';

const MyRestaurantOrdersPage = () => {
  const { orders, isLoading } = useGetRestaurantOrders();

  if (isLoading) {
    return <div>Loading...</div>;
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
