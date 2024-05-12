import { Restaurant } from '@/types';
import { Link } from 'react-router-dom';
import { AspectRatio } from './ui/aspect-ratio';
import { Banknote, Clock, Dot } from 'lucide-react';

type Props = {
  restaurant: Restaurant;
};

const SearchResultCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className='grid lg:grid-cols-[2fr_3fr] gap-5 group shadow-lg border rounded-md'
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          className='w-full h-full object-cover rounded-t-md md:rounded-e-none md:rounded-s-md'
        />
      </AspectRatio>

      <div className='p-4 md:px-0'>
        <h3 className='text-2xl font-bold tracking-tight mb-2 group-hover:underline'>
          {restaurant.restaurantName}
        </h3>

        <div id='card-content' className='grid md:grid-cols-2 gap-2'>
          <div className='flex flex-row flex-wrap'>
            {restaurant.cuisines.map((item, i) => (
              <span className='flex'>
                <span>{item}</span>
                {i < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>

          <div className='flex gap-2 flex-col'>
            <div
              className={`flex items-center gap-1 ${
                restaurant.estimatedDeliveryTime > 70
                  ? 'text-orange-600'
                  : 'text-green-600'
              } `}
            >
              <Clock
                className={`${
                  restaurant.estimatedDeliveryTime > 70
                    ? 'text-orange-600'
                    : 'text-green-600'
                } `}
              />
              {restaurant.estimatedDeliveryTime} mins
            </div>

            <div className='flex items-center gap-1'>
              <Banknote />
              Delivery for €{(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
