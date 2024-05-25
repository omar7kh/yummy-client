import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { Separator } from '../ui/separator';
import { IsLoggedInLinks, NotLoggedInLinks } from './NavLinks';

const MobileNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { user, logout } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className='text-primary cursor-pointer' aria-label='Main Menu' />
      </SheetTrigger>

      <SheetContent className='space-y-3'>
        <SheetHeader>
          <SheetTitle className='text-primary mx-auto'>Yummy</SheetTitle>
        </SheetHeader>

        <Separator />

        {isAuthenticated ? (
          <div className='space-y-3'>
            <IsLoggedInLinks user={user} logout={logout} />
          </div>
        ) : (
          <div className='flex justify-evenly'>
            <NotLoggedInLinks loginWithRedirect={loginWithRedirect} />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
