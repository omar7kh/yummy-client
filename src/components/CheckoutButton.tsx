import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import LoadingButton from './LoadingButton';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import UserProfileForm, {
  UserFormData,
} from '@/forms/userProfileForm/UserProfileForm';
import { useGetCurrentUser } from '@/api/UserApi';

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const { currentUser, isLoading: isGetUserLoading } = useGetCurrentUser();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} variant='primary'>
        Log in to check out
      </Button>
    );
  }

  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} variant='primary'>
          Go to checkout
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-[425px] md:min-w-[700px]'>
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title='Confirm Delivery Details'
          buttonText='Continue to payment'
          isBorder={false}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
