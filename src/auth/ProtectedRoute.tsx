import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <span>loading...</span>;
  }

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to='/' replace />;
};

export default ProtectedRoute;
