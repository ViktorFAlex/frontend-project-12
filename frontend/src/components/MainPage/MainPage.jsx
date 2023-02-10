import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Channels from './components/Channels';
import { fetchChannels } from '../../slices/channelsSlice';
import selectors from '../../slices/selectors';
import { useAuthContext } from '../../hooks/index';

const MainPage = () => {
  const dispatch = useDispatch();
  const auth = useAuthContext();

  useEffect(() => {
    const headers = auth.getAuthHeaders();
    dispatch(fetchChannels(headers));
  }, [dispatch, auth]);

  const channels = useSelector(selectors.selectChannels);

  return (
    !!channels.length
&& <Channels />
  );
};

export default MainPage;
