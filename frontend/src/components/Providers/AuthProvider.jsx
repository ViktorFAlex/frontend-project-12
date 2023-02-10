import {
  useState, useMemo, useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../contexts/index';
import { actions as channelsActions } from '../../slices/channelsSlice';
import selectors from '../../slices/selectors';
import notifiers from '../../toasts/index';

const AuthProvider = ({ children }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const parsedInfo = JSON.parse(localStorage.getItem('userId')) || { username: null, token: null };

  const [loginStatus, setLoginStatus] = useState(parsedInfo);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoginStatus({ username: null, token: null });
  };

  const error = useSelector(selectors.selectAuthError);
  if (error) {
    const { message } = error;
    if (message === 'Unauthorized') {
      logOut();
      notifiers.error(t, 'Unauthorized');
    } else {
      notifiers.error(t, 'SomethingWrong');
    }
    dispatch(channelsActions.cleanError());
  }

  const getAuthHeaders = useCallback(() => {
    const { token } = loginStatus;
    return token ? { Authorization: `Bearer ${loginStatus.token}` } : {};
  }, [loginStatus]);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setLoginStatus({ username: data.username, token: data.token });
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

export default AuthProvider;
