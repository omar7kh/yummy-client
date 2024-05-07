import { Separator } from './ui/separator';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { LogoutOptions, User } from '@auth0/auth0-react';

type LoggedInProps = {
  user: User | undefined;
  logout: (options?: LogoutOptions | undefined) => Promise<void>;
};

type NotLoggedInProps = {
  loginWithRedirect: () => Promise<void>;
};

export const IsLoggedInLinks = ({ user, logout }: LoggedInProps) => {
  return (
    <>
      <span className='text-sm px-2'>{user?.name}</span>
      <Separator className='my-1' />

      <div className='flex flex-col text-sm'>
        <Link to='/profile' className='pl-2 py-1 hover:bg-gray-200 rounded-sm'>
          Profile
        </Link>
        <Link to='/orders' className='pl-2 py-1 hover:bg-gray-200 rounded-sm'>
          Orders
        </Link>
        <Button
          variant='ghost'
          className='pl-2 py-1 hover:bg-gray-200 rounded-sm'
          onClick={async () => await logout()}
        >
          Logout
        </Button>
      </div>
    </>
  );
};

export const NotLoggedInLinks = ({ loginWithRedirect }: NotLoggedInProps) => {
  return (
    <>
      <Button
        variant='ghost'
        className='pl-2 py-1 hover:bg-gray-200 rounded-sm'
        onClick={async () => await loginWithRedirect()}
      >
        Login
      </Button>
      <Button
        variant='ghost'
        className='pl-2 py-1 hover:bg-gray-200 rounded-sm'
      >
        Sign up
      </Button>
    </>
  );
};
