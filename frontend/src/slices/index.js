import { configureStore } from '@reduxjs/toolkit';
import channelsReducers from './channelsSlice.js';
import messagesReducers from './messagesSlice';

export default configureStore({
  reducer: {
    channels: channelsReducers,
    messages: messagesReducers,
  },
});
