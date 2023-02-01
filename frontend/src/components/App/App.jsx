import { Navbar } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginPage from '../LoginPage/LoginPage';
import WrongPage from '../WrongPage/WrongPage.jsx';
import MainPage from '../MainPage/MainPage.jsx';
import SignupPage from '../SignupPage/SignupPage.jsx';
import PageRoute from './common-components/PageRoute';
import AuthButton from './common-components/AuthButton';
import routes from '../../routes/routes';

const App = () => {
  const { t } = useTranslation();
  const { appRoutes } = routes;
  return (
    <div className="d-flex flex-column h-100">
      <Router>
        <Navbar bg="white" expand="lg" className="shadow-sm">
          <div className="container">
            <Navbar.Brand as={Link} to={appRoutes.main}>{t('elements.hexlet')}</Navbar.Brand>
            <AuthButton />
          </div>
        </Navbar>
        <Routes>
          <Route
            path={appRoutes.main}
            element={(
              <PageRoute route={appRoutes.main}>
                <MainPage />
              </PageRoute>
                )}
          />
          <Route
            path={appRoutes.signup}
            element={(
              <PageRoute route={appRoutes.signup}>
                <SignupPage />
              </PageRoute>
            )}
          />
          <Route
            path={appRoutes.login}
            element={(
              <PageRoute route={appRoutes.login}>
                <LoginPage />
              </PageRoute>
                )}
          />
          <Route path={appRoutes.default} element={<WrongPage />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
