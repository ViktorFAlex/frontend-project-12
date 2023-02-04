import { useState, useMemo, useCallback } from 'react';
import { AuthContext } from '../../contexts/index';

const AppProvider = ({ children }) => {
  const parsedInfo = JSON.parse(localStorage.getItem('userId')) || { username: null, token: null };

  const [loginStatus, setLoginStatus] = useState(parsedInfo);

  const getAuthHeaders = useCallback(() => {
    const { token } = loginStatus;
    return token ? { Authorization: `Bearer ${loginStatus.token}` } : {};
  }, [loginStatus]);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setLoginStatus({ username: data.username, token: data.token });
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoginStatus({ username: null, token: null });
  };
  const authHandlers = useMemo(() => ({
    loginStatus, logIn, logOut, getAuthHeaders,
  }), [loginStatus, getAuthHeaders]);

  return (
    <AuthContext.Provider value={authHandlers}>
      {children}
    </AuthContext.Provider>
  );
};

export default AppProvider;
