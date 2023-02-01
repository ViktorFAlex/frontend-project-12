import { useLocation, Navigate } from 'react-router-dom';
import useAuthContext from '../../../hooks/useAuthContext';
import routes from '../../../routes/routes.js';

const PageRoute = ({ children, route }) => {
  const auth = useAuthContext();
  const location = useLocation();
  const { appRoutes } = routes;

  switch (route) {
    case (appRoutes.main):
      return (auth.loginStatus.username
        ? children
        : <Navigate to={appRoutes.login} state={{ from: location }} />);
    case (appRoutes.login):
    case (appRoutes.signup):
      return (auth.loginStatus.username
        ? <Navigate to={appRoutes.main} state={{ from: location }} />
        : children);
    default:
      throw new Error(`Unexpected route: ${route}`);
  }
};

export default PageRoute;
