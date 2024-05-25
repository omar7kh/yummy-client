import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { useAuth0 } from '@auth0/auth0-react';
import { IsLoggedInLinks, NotLoggedInLinks } from './NavLinks';
import { Menu } from 'lucide-react';

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { user, logout } = useAuth0();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none flex'>
        <Menu
          className='text-primary md:w-8 md:h-8'
          aria-label='User Profile'
        />
      </DropdownMenuTrigger>

      {isAuthenticated ? (
        <>
          <DropdownMenuContent>
            <IsLoggedInLinks user={user} logout={logout} />
          </DropdownMenuContent>
        </>
      ) : (
        <DropdownMenuContent className='flex flex-col text-sm'>
          <NotLoggedInLinks loginWithRedirect={loginWithRedirect} />
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default MainNav;
