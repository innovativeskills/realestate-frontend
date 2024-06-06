import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  //   return !!localStorage.getItem('authToken');
  return true;
};

const AuthGuard = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/pages/login/login3" />;
};

export default AuthGuard;
