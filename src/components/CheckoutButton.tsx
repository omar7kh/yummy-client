import { Button } from './ui/button';
import LoadingButton from './LoadingButton';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { useCheckAuth } from '@/api/checkAuth';
import { useGetCurrentUser } from '@/api/UserApi';
import UserForm, {
  UserFormData,
} from '@/forms/userProfileForm/UserProfileForm';
import { Link } from 'react-router-dom';

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  const { isError } = useCheckAuth();
  const { currentUser, isLoading: isGetUserLoading } = useGetCurrentUser();

  if (isError) {
    return (
      <Link to='/login'>
        <Button variant='primary'>Log in to check out</Button>
      </Link>
    );
  }

  if (!currentUser || isLoading) {
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
        <UserForm
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
