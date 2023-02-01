import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Channels from './components/Channels/Channels';
import { fetchChannels } from '../../slices/channelsSlice';
import selectors from '../../slices/selectors';
import useAuthContext from '../../hooks/useAuthContext.jsx';
import notifiers from '../../toasts/index';

const MainPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useAuthContext();

  useEffect(() => {
    const headers = auth.getAuthHeaders();

    dispatch(fetchChannels(headers))
      .catch((error) => {
        const { message } = error;
        if (message === 'Unauthorized') {
          auth.logOut();
        }
        notifiers.error(t, message);
      });
  }, [dispatch, auth, t]);

  const channels = useSelector(selectors.selectChannels);

  return (
    !!channels.length
&& <Channels />
  );
};

export default MainPage;
