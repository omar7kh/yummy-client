import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const CarouselHero = () => {
  const plugin = React.useRef(Autoplay({ delay: 10000 }));

  const images: string[] = [
    './assets/images/img01_1400-933.webp',
    './assets/images/img02_1400-933.webp',
    './assets/images/img03_1400-933.webp',
    './assets/images/img04_1400-933.webp',
    './assets/images/img05_1400-933.webp',
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.play}
    >
      <CarouselContent>
        {images.map((image: string, index: number) => (
          <CarouselItem key={index}>
            <div className='p-1'>
              <Card>
                <CardContent className='w-full max-h-[500px] flex aspect-square items-center justify-center p-0'>
                  <img
                    loading='lazy'
                    src={image}
                    alt='hero image'
                    className='object-cover h-full w-full rounded-md select-none'
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselHero;
