import { Restaurant } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Dot } from 'lucide-react';

type Props = {
  restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>{restaurant.restaurantName}</CardTitle>

        <CardDescription>
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>

      <CardContent className='flex flex-wrap'>
        {restaurant.cuisines.map((cuisine, i) => (
          <span className='flex'>
            <span>{cuisine}</span>
            {i < restaurant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
