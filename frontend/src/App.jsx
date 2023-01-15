import { useState, useMemo } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import WrongPage from './components/WrongPage.jsx';
import MainPage from './components/MainPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import AuthContext from './contexts/index.jsx';
import useAuthContext from './hooks/useCustomContext.jsx';
import notifiers from './toasts/index';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('userId') && true);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const loginHandler = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);
  return (
    <AuthContext.Provider value={loginHandler}>
      {children}
    </AuthContext.Provider>
  );
};

const MainPageRoute = ({ children }) => {
  const auth = useAuthContext();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuthContext();
  const handleClick = () => {
    notifiers.loggedOut(t);
    auth.logOut();
  };
  return (
    auth.loggedIn
      ? <Button onClick={handleClick}>Выйти</Button>
      : null
  );
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
      <Router>
        <Navbar bg="white" expand="lg" className="shadow-sm">
          <div className="container">
            <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
            <AuthButton />
          </div>
        </Navbar>
        <Routes>
          <Route
            path="/"
            element={(
              <MainPageRoute>
                <MainPage />
              </MainPageRoute>
                )}
          />
          <Route
            path="/signup"
            element={(
              <SignupPage />
            )}
          />
          <Route
            path="/login"
            element={(
              <LoginPage />
                )}
          />
          <Route path="*" element={<WrongPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  </div>
);
export default App;
