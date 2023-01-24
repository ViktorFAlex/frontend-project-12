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
import AuthProvider from './common-components/AuthProvider';
import PageRoute from './common-components/PageRoute';
import AuthButton from './common-components/AuthButton';

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
              <PageRoute route="main">
                <MainPage />
              </PageRoute>
                )}
          />
          <Route
            path="/signup"
            element={(
              <PageRoute route="signup">
                <SignupPage />
              </PageRoute>
            )}
          />
          <Route
            path="/login"
            element={(
              <PageRoute route="login">
                <LoginPage />
              </PageRoute>
                )}
          />
          <Route path="*" element={<WrongPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  </div>
);
export default App;
