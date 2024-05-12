import ProtectedRoute from '@/auth/ProtectedRoute';
import PageNotFound from '@/components/PageNotFound';
import Layout from '@/layouts/Layout';
import AuthCallbackPage from '@/pages/AuthCallbackPage';
import Home from '@/pages/Home';
import ProfilePage from '@/pages/ProfilePage';
import RestaurantPage from '@/pages/RestaurantPage';
import SearchPage from '@/pages/SearchPage';
import RouterRoot from '@/routerRoot/RouterRoot';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <RouterRoot />,
    children: [
      {
        path: '/',
        element: (
          <Layout>
            <Home />
          </Layout>
        ),
      },

      {
        path: '/auth/callback',
        element: <AuthCallbackPage />,
      },

      {
        path: '/search/:city',
        element: (
          <Layout>
            <SearchPage />
          </Layout>
        ),
      },

      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Layout>
              <ProfilePage />
            </Layout>
          </ProtectedRoute>
        ),
      },

      {
        path: '/restaurant',
        element: (
          <ProtectedRoute>
            <Layout>
              <RestaurantPage />
            </Layout>
          </ProtectedRoute>
        ),
      },

      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
