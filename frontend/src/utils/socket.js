import { io } from 'socket.io-client';
import notifiers from '../toasts/index';
import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';
import { actions as activeChannelActions } from '../slices/activeChannelSlice';
import store from '../slices/index';

const socket = io();
const socketTimeout = 4000;

export const connectSocket = (i18n) => {
  socket.on('newChannel', (data) => {
    store.dispatch(channelsActions.addChannel(data));
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(channelsActions.removeChannel(id));
  });
  socket.on('renameChannel', (data) => {
    store.dispatch(channelsActions.renameChannel(data));
  });
  socket.on('newMessage', (message) => {
    store.dispatch(messagesActions.addMessage(message));
  });
  socket.on('disconnect', () => {
    notifiers.networkError(i18n.t);
  });
};

const socketPromise = (action, cb = null) => (data, t) => new Promise((resolve, reject) => {
  socket.timeout(socketTimeout).emit(action, data, (error, response) => {
    if (error) {
      reject(new Error('network Error'));
    } else {
      if (cb) {
        cb(t, response);
      }
      resolve(response);
    }
  });
});

export default {
  addMessage: socketPromise('newMessage'),
  addChannel: socketPromise('newChannel', (t, { data }) => {
    store.dispatch(channelsActions.addChannel(data));
    store.dispatch(activeChannelActions.setActiveChannel(data.id));
    notifiers.addChannel(t);
  }),
  removeChannel: socketPromise('removeChannel', (t) => notifiers.removeChannel(t)),
  renameChannel: socketPromise('renameChannel', (t) => notifiers.renameChannel(t)),
};
