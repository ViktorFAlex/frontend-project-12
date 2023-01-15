import { configureStore } from '@reduxjs/toolkit';
import channelsReducers from './channelsSlice';
import messagesReducers from './messagesSlice';

export default configureStore({
  reducer: {
    channels: channelsReducers,
    messages: messagesReducers,
  },
});
