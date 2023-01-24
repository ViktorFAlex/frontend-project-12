import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Channels from './components/Channels/Channels';
import { fetchChannels, selectors as channelsSelectors } from '../../slices/channelsSlice';
import useAuthContext from '../../hooks/useCustomContext.jsx';
import notifiers from '../../toasts/index';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const MainPage = () => {
  const { t } = useTranslation();
  const auth = useAuthContext();
  const dispatch = useDispatch();
  useEffect(() => {
    const authenticate = async () => {
      try {
        const header = getAuthHeader();
        await dispatch(fetchChannels(header));
      } catch (e) {
        console.error('error', e);
        notifiers.networkError(t);
        auth.logOut();
      }
    };
    authenticate();
  }, [auth, dispatch, t]);
  const channels = useSelector(channelsSelectors.selectAll);
  return (
    !!channels.length
&& <Channels />
  );
};

export default MainPage;
