import { Link } from 'react-router-dom';
import MobileNav from './MobileNav';
import MainNav from './MainNav';
import { User } from '@/types';

const Header: React.FC = () => {
  const userInfoString: string | null = localStorage.getItem('UserInfo');

  let userInfo: User | null = null;

  if (userInfoString) {
    userInfo = JSON.parse(userInfoString) as User;
  } else {
    userInfo = null;
  }

  return (
    <header className='border-b-2 border-primary py-6 shadow-lg sticky top-0 bg-background z-50'>
      <div className='container flex justify-between items-center'>
        <Link
          to='/'
          className='font-bold text-lg text-primary tracking-tighter md:text-3xl'
        >
          Yummy
        </Link>

        <div className='hidden md:block'>
          <MainNav userInfo={userInfo} />
        </div>
        <div className='md:hidden'>
          <MobileNav userInfo={userInfo} />
        </div>
      </div>
    </header>
  );
};

export default Header;
