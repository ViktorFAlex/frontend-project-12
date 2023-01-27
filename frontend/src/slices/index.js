import { configureStore } from '@reduxjs/toolkit';
import channelsReducers from './channelsSlice';
import messagesReducers from './messagesSlice';
import modalsSliceReducers from './modalsSlice';

export default configureStore({
  reducer: {
    channels: channelsReducers,
    messages: messagesReducers,
    modals: modalsSliceReducers,
  },
});
