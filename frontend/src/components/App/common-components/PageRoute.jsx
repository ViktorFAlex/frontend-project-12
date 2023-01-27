import { useLocation, Navigate } from 'react-router-dom';
import useCustomContext from '../../../hooks/useCustomContext.jsx';
import appRoutes from '../../../utils/appRoutes.js';

const PageRoute = ({ children, route }) => {
  const { loginHandlers } = useCustomContext();
  const location = useLocation();

  switch (route) {
    case (appRoutes.main):
      return (loginHandlers.loginStatus.isLogged
        ? children
        : <Navigate to={appRoutes.login} state={{ from: location }} />);
    case (appRoutes.login):
    case (appRoutes.signup):
      return (loginHandlers.loginStatus.isLogged
        ? <Navigate to={appRoutes.main} state={{ from: location }} />
        : children);
    default:
      throw new Error(`Unexpected route: ${route}`);
  }
};

export default PageRoute;
