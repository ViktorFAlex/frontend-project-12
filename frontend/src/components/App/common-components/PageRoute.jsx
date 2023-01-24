import { useLocation, Navigate } from 'react-router-dom';
import useAuthContext from '../../../hooks/useCustomContext.jsx';

const PageRoute = ({ children, route }) => {
  const auth = useAuthContext();
  const location = useLocation();
  switch (route) {
    case ('main'):
      return (auth.loggedIn.isLogged ? children : <Navigate to="/login" state={{ from: location }} />);
    case ('login'):
    case ('signup'):
      return (auth.loggedIn.isLogged ? <Navigate to="/" state={{ from: location }} /> : children);
    default:
      throw new Error(`Unexpected route: ${route}`);
  }
};

export default PageRoute;
