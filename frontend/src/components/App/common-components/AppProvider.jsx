import { useState, useMemo } from 'react';
import CustomContext from '../../../contexts/index.jsx';

const AppProvider = ({ children, socketHandlers }) => {
  const parsedInfo = JSON.parse(localStorage.getItem('userId'));
  const initLoginStatus = {
    isLogged: !!parsedInfo, user: parsedInfo?.username ?? null, token: parsedInfo?.token ?? null,
  };

  const [loginStatus, setLoginStatus] = useState(initLoginStatus);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setLoginStatus({ isLogged: true, user: data.username, token: data.token });
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoginStatus({ isLogged: false, user: null, token: null });
  };
  const providerHandlers = useMemo(() => ({
    loginHandlers: { loginStatus, logIn, logOut },
    socketHandlers,
  }), [loginStatus, socketHandlers]);

  return (
    <CustomContext.Provider value={providerHandlers}>
      {children}
    </CustomContext.Provider>
  );
};

export default AppProvider;
