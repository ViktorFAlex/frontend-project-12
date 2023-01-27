import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Channels from './components/Channels/Channels';
import { fetchChannels } from '../../slices/channelsSlice';
import selectors from '../../slices/selectors';
import useCustomContext from '../../hooks/useCustomContext.jsx';
import notifiers from '../../toasts/index';

const getAuthHeaders = (token) => (token ? { Authorization: `Bearer ${token}` } : {});

const MainPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loginHandlers } = useCustomContext();

  useEffect(() => {
    const { token } = loginHandlers.loginStatus;
    const headers = getAuthHeaders(token);

    dispatch(fetchChannels(headers))
      .catch((error) => {
        const { message } = error;
        if (message === 'Unauthorized') {
          loginHandlers.logOut();
        }
        notifiers.error(t, message);
      });
  }, [dispatch, loginHandlers, t]);

  const channels = useSelector(selectors.selectChannels);

  return (
    !!channels.length
&& <Channels />
  );
};

export default MainPage;
