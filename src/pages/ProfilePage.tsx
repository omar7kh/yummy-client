import { useGetCurrentUser, useUpdateUser } from '@/api/UserApi';
import UserProfileForm from '@/forms/userProfileForm/UserProfileForm';

const ProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetCurrentUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();

  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  return (
    <UserProfileForm
      onSave={updateUser}
      isLoading={isUpdateLoading}
      currentUser={currentUser}
      isBorder={true}
    />
  );
};

export default ProfilePage;
