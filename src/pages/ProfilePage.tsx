import { useGetCurrentUser, useUpdateUser } from '@/api/UserApi';
import Spinner from '@/components/Spinner';
import UserProfileForm from '@/forms/userProfileForm/UserProfileForm';

const ProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetCurrentUser();
  const { updatedUser, isLoading: isUpdateLoading } = useUpdateUser();

  if (isGetLoading) {
    return <Spinner />;
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  return (
    <UserProfileForm
      onSave={updatedUser}
      isLoading={isUpdateLoading}
      currentUser={currentUser}
      isBorder={true}
    />
  );
};

export default ProfilePage;
