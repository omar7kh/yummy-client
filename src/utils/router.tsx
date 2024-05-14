import ProtectedRoute from '@/auth/ProtectedRoute';
import PageNotFound from '@/components/PageNotFound';
import Layout from '@/layouts/Layout';
import AuthCallbackPage from '@/pages/AuthCallbackPage';
import Home from '@/pages/Home';
import MyRestaurantOrdersPage from '@/pages/MyRestaurantOrdersPage';
import ManageMyRestaurantPage from '@/pages/ManageMyRestaurantPage';
import OrderStatusPage from '@/pages/OrderStatusPage';
import ProfilePage from '@/pages/ProfilePage';
import RestaurantDetailPage from '@/pages/RestaurantDetailPage';
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
        path: '/my-restaurant',
        element: (
          <ProtectedRoute>
            <Layout>
              <ManageMyRestaurantPage />
            </Layout>
          </ProtectedRoute>
        ),
      },
      {
        path: '/my-restaurant-orders',
        element: (
          <ProtectedRoute>
            <Layout>
              <MyRestaurantOrdersPage />
            </Layout>
          </ProtectedRoute>
        ),
      },
      {
        path: '/order-status',
        element: (
          <ProtectedRoute>
            <Layout>
              <OrderStatusPage />
            </Layout>
          </ProtectedRoute>
        ),
      },
      {
        path: `/detail/:restaurantId`,
        element: (
          <Layout>
            <RestaurantDetailPage />
          </Layout>
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
