import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import WrongPage from '../WrongPage/WrongPage.jsx';
import MainPage from '../MainPage/MainPage.jsx';
import SignupPage from '../SignupPage/SignupPage.jsx';
import PageRoute from './components/PageRoute';
import NavBar from './components/NavBar';
import routes from '../../routes/index';

const App = () => (
  <div className="d-flex flex-column h-100">
    <Router>
      <NavBar />
      <Routes>
        <Route
          path={routes.app.mainRoute()}
          element={<PageRoute />}
        >
          <Route index element={<MainPage />} />
          <Route path={routes.app.loginRoute()} element={<LoginPage />} />
          <Route path={routes.app.signupRoute()} element={<SignupPage />} />
        </Route>
        <Route path={routes.app.defaultRoute()} element={<WrongPage />} />
      </Routes>
    </Router>
  </div>
);
export default App;
