import CarouselHero from '@/components/Carousel';
import Search from '@/components/search/SearchBarHome';

const Home = () => {
  return (
    <div className='flex flex-col gap-6'>
      <CarouselHero />
      <Search />
    </div>
  );
};

export default Home;
