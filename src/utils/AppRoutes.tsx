import ProtectedRoute from '@/auth/ProtectedRoute';
import Layout from '@/layouts/Layout';
import Home from '@/pages/Home';
import MyRestaurantOrdersPage from '@/pages/MyRestaurantOrdersPage';
import ManageMyRestaurantPage from '@/pages/ManageMyRestaurantPage';
import OrderStatusPage from '@/pages/OrderStatusPage';
import ProfilePage from '@/pages/ProfilePage';
import RestaurantDetailPage from '@/pages/RestaurantDetailPage';
import SearchPage from '@/pages/SearchPage';
import { createBrowserRouter } from 'react-router-dom';
import PageNotFound from '@/pages/PageNotFound';
import SignUp from '@/pages/auth/SignUp';
import Login from '@/pages/auth/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/sign-up',
    element: (
      <Layout>
        <SignUp />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
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
]);

export default router;
