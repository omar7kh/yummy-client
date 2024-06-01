import { useCheckAuth } from '@/api/checkAuth';
import Spinner from '@/components/Spinner';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isAuth, isLoading } = useCheckAuth();

  if (isLoading) return <Spinner />;

  if (isAuth) return children;

  return <Navigate to='/' replace />;
};

export default ProtectedRoute;
