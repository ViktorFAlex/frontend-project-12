import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChannelProvider from './ChannelProvider';
import Channels from './Channels';
import { fetchChannels, selectors as channelsSelectors } from '../slices/channelsSlice';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const header = getAuthHeader();
    dispatch(fetchChannels(header));
  }, [dispatch]);
  const channels = useSelector(channelsSelectors.selectAll);
  return channels && (
    <ChannelProvider>
      <Channels channels={channels} />
    </ChannelProvider>
  );
};

export default MainPage;
