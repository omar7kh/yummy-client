import { User } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { IsLoggedInLinks, NotLoggedInLinks } from './NavLinks';
import { Menu } from 'lucide-react';

type MainNavProps = {
  userInfo: User | null;
};

const MainNav = ({ userInfo }: MainNavProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none flex'>
        <Menu
          className='text-primary md:w-8 md:h-8'
          aria-label='User Profile'
        />
      </DropdownMenuTrigger>

      {userInfo ? (
        <>
          <DropdownMenuContent>
            <IsLoggedInLinks userInfo={userInfo} />
          </DropdownMenuContent>
        </>
      ) : (
        <DropdownMenuContent className='flex flex-col text-sm'>
          <NotLoggedInLinks />
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default MainNav;
