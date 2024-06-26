import { Order } from '@/types';

type Props = {
  order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
  console.log(order.totalAmount);

  return (
    <div className='space-y-5'>
      <div className='flex flex-col'>
        <span className='font-bold'>Delivering to:</span>
        <span>
          {`${order.deliveryDetails.firstName}  ${order.deliveryDetails.lastName}`}
        </span>
        <span>
          {order.deliveryDetails.address.street},{' '}
          {order.deliveryDetails.address.city}
        </span>
      </div>
      <div className='flex flex-col'>
        <span className='font-bold'>Your Order:</span>
        <ul>
          {order.cartItems.map((item) => (
            <li>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>

      <div className='flex flex-col'>
        <span className='font-bold'>Total:</span>
        <span>{(order.totalAmount / 100).toFixed(2)} €</span>
      </div>
    </div>
  );
};

export default OrderStatusDetail;
