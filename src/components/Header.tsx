import { Link } from 'react-router-dom';
import MainNav from './MainNav';
import MobileNav from './MobileNav';

const Header = () => {
  return (
    <header className='border-b-2 border-primary py-6 shadow-lg fixed left-0 right-0 top-0 bg-background z-50'>
      <div className='container flex justify-between items-center'>
        <Link
          to='/'
          className='font-bold text-lg text-primary tracking-tighter md:text-3xl'
        >
          Yummy
        </Link>

        <div className='hidden md:block'>
          <MainNav />
        </div>
        <div className='md:hidden'>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
