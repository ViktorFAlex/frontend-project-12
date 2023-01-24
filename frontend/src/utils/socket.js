import { io } from 'socket.io-client';
import notifiers from '../toasts/index';
import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';
import { actions as activeChannelActions } from '../slices/activeChannelSlice';
import store from '../slices/index';

const socket = io();
const socketTimeout = 4000;

const notifyByUser = (i18n, action) => {
  const { activeChannel } = store.getState();
  if (activeChannel.byActiveUser) {
    notifiers[action](i18n.t);
    store.dispatch(activeChannelActions.setByActiveUser(false));
  }
};

export const connectSocket = (i18n) => {
  socket.on('newChannel', (data) => {
    store.dispatch(channelsActions.addChannel(data));
    notifyByUser(i18n, 'addChannel');
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(channelsActions.removeChannel(id));
    notifyByUser(i18n, 'removeChannel');
  });
  socket.on('renameChannel', (data) => {
    store.dispatch(channelsActions.renameChannel(data));
    notifyByUser(i18n, 'renameChannel');
  });
  socket.on('newMessage', (message) => {
    store.dispatch(messagesActions.addMessage(message));
  });
  socket.on('disconnect', () => {
    notifiers.networkError(i18n.t);
  });
};

const socketPromise = (action, cb = null) => (data) => new Promise((resolve, reject) => {
  socket.timeout(socketTimeout).emit(action, data, (error, response) => {
    if (error) {
      reject(new Error('network Error'));
    } else {
      if (cb) {
        cb();
      }
      resolve(response);
    }
  });
});

export default {
  addMessage: socketPromise('newMessage'),
  addChannel: socketPromise('newChannel', () => store.dispatch(activeChannelActions.setByActiveUser(true))),
  removeChannel: socketPromise('removeChannel', () => store.dispatch(activeChannelActions.setByActiveUser(true))),
  renameChannel: socketPromise('renameChannel', () => store.dispatch(activeChannelActions.setByActiveUser(true))),
};
