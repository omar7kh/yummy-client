import Auth0ProviderWithNavigate from '@/auth/Auth0ProviderWithNavigate';
import { Outlet } from 'react-router-dom';

const RouterRoot = () => {
  return (
    <Auth0ProviderWithNavigate>
      <Outlet />
    </Auth0ProviderWithNavigate>
  );
};

export default RouterRoot;
