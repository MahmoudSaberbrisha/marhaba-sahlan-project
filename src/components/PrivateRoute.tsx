import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Login from '../pages/Login';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">
          <div className="bg-primary rounded-lg p-3 mb-4">
            <div className="h-8 w-8 bg-primary-foreground rounded"></div>
          </div>
          <div className="h-4 bg-primary rounded w-48"></div>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Login />;
};

export default PrivateRoute;