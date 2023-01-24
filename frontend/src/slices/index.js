import { configureStore } from '@reduxjs/toolkit';
import channelsReducers from './channelsSlice';
import messagesReducers from './messagesSlice';
import activeChannelReducers from './activeChannelSlice';
import modalsSliceReducers from './modalsSlice';

export default configureStore({
  reducer: {
    channels: channelsReducers,
    messages: messagesReducers,
    activeChannel: activeChannelReducers,
    modals: modalsSliceReducers,
  },
});
