import { useState, useMemo, useEffect } from 'react';
import AuthContext from '../../../contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState({ isLogged: false, user: null });
  useEffect(() => {
    const parsedInfo = JSON.parse(localStorage.getItem('userId'));
    if (parsedInfo) {
      setLoggedIn({ isLogged: true, user: parsedInfo.username });
    }
  }, []);
  const logIn = (username) => setLoggedIn({ isLogged: true, user: username });
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn({ isLogged: false, user: null });
  };
  const loginHandler = useMemo(() => ({
    loggedIn, logIn, logOut,
  }), [loggedIn]);
  return (
    <AuthContext.Provider value={loginHandler}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
