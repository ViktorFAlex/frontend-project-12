import { Navbar } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import WrongPage from '../WrongPage/WrongPage.jsx';
import MainPage from '../MainPage/MainPage.jsx';
import SignupPage from '../SignupPage/SignupPage.jsx';
import AppProvider from './common-components/AppProvider';
import PageRoute from './common-components/PageRoute';
import AuthButton from './common-components/AuthButton';
import appRoutes from '../../utils/appRoutes';

const App = ({ socketHandlers }) => (
  <div className="d-flex flex-column h-100">
    <AppProvider socketHandlers={socketHandlers}>
      <Router>
        <Navbar bg="white" expand="lg" className="shadow-sm">
          <div className="container">
            <Navbar.Brand as={Link} to={appRoutes.main}>Hexlet Chat</Navbar.Brand>
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
    </AppProvider>
  </div>
);
export default App;
