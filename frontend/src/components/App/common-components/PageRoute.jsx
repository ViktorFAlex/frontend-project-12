import { useLocation, Navigate } from 'react-router-dom';
import useAuthContext from '../../../hooks/useAuthContext';
import routes from '../../../routes/index.js';

const PageRoute = ({ children, route }) => {
  const auth = useAuthContext();
  const location = useLocation();
  console.log(routes, children);
  switch (route) {
    case (routes.app.mainRoute()):
      return (auth.loginStatus.username
        ? children
        : <Navigate to={routes.app.loginRoute()} state={{ from: location }} />);
    case (routes.app.loginRoute()):
    case (routes.app.signupRoute()):
      return (auth.loginStatus.username
        ? <Navigate to={routes.app.mainRoute()} state={{ from: location }} />
        : children);
    default:
      throw new Error(`Unexpected route: ${route}`);
  }
};

export default PageRoute;
