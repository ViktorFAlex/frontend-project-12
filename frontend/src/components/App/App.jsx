import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import WrongPage from '../WrongPage/WrongPage.jsx';
import MainPage from '../MainPage/MainPage.jsx';
import SignupPage from '../SignupPage/SignupPage.jsx';
import PageRoute from './common-components/PageRoute';
import NavBar from './common-components/NavBar';
import routes from '../../routes/index';

const App = () => (
  <div className="d-flex flex-column h-100">
    <Router>
      <NavBar />
      <Routes>
        <Route
          path={routes.app.mainRoute()}
          element={(
            <PageRoute route={routes.app.mainRoute()}>
              <MainPage />
            </PageRoute>
                )}
        />
        <Route
          path={routes.app.signupRoute()}
          element={(
            <PageRoute route={routes.app.signupRoute()}>
              <SignupPage />
            </PageRoute>
            )}
        />
        <Route
          path={routes.app.loginRoute()}
          element={(
            <PageRoute route={routes.app.loginRoute()}>
              <LoginPage />
            </PageRoute>
                )}
        />
        <Route path={routes.app.defaultRoute()} element={<WrongPage />} />
      </Routes>
    </Router>
  </div>
);
export default App;
