import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuthContext from '../../../hooks/useAuthContext';
import routes from '../../../routes/index.js';

const PageRoute = () => {
  const auth = useAuthContext();
  const location = useLocation();

  switch (location.pathname) {
    case (routes.app.mainRoute()):
      return auth.loginStatus.username
        ? <Outlet />
        : <Navigate to={routes.app.loginRoute()} state={{ from: location }} />;
    case (routes.app.loginRoute()):
    case (routes.app.signupRoute()):
      return auth.loginStatus.username
        ? <Navigate to={routes.app.mainRoute()} state={{ from: location }} />
        : <Outlet />;
    default:
      return null;
  }
};

export default PageRoute;
