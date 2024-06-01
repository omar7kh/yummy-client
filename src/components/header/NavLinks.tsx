import { Separator } from '../ui/separator';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { User } from '@/types';
import { useLogoutUser } from '@/api/UserApi';

type MainNavProps = {
  userInfo: User | null;
};
export const IsLoggedInLinks = ({ userInfo }: MainNavProps) => {
  const { logoutUser, isLoading } = useLogoutUser();

  const navigate = useNavigate();

  const handleLogout = async () => {
    logoutUser();
    localStorage.removeItem('UserInfo');
    navigate('/');
  };

  if (isLoading) return;

  return (
    <>
      <div className='text-sm px-2 text-center'>{`${userInfo?.firstName} ${userInfo?.lastName}`}</div>
      <Separator className='my-1' />

      <div className='flex flex-col text-sm'>
        <Link to='/profile' className='pl-2 py-1 hover:bg-muted rounded-sm'>
          Profile
        </Link>
        <Link
          to='/order-status'
          className='pl-2 py-1 hover:bg-muted rounded-sm'
        >
          Orders
        </Link>
        <Link
          to='/my-restaurant'
          className='pl-2 py-1 hover:bg-muted rounded-sm'
        >
          My Restaurant
        </Link>
        <Link
          to='/my-restaurant-orders'
          className='pl-2 py-1 hover:bg-muted rounded-sm'
        >
          My Restaurant Orders
        </Link>
        <Button
          variant='ghost'
          className='pl-2 py-1 hover:bg-muted rounded-sm'
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </>
  );
};

export const NotLoggedInLinks = () => {
  return (
    <>
      <Link to='/login'>
        <Button variant='ghost' className='w-full'>
          Login
        </Button>
      </Link>

      <Link to='/sign-up'>
        <Button variant='ghost' className='w-full'>
          Sign up
        </Button>
      </Link>
    </>
  );
};
