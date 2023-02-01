import store from '../slices/index.js';
import notifiers from '../toasts/index';
import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';

const buildChatApi = (socket, i18n) => {
  const socketTimeout = 4000;

  socket.on('newChannel', (data) => {
    store.dispatch(channelsActions.addChannel(data));
  })
    .on('removeChannel', ({ id }) => {
      store.dispatch(channelsActions.removeChannel(id));
    })
    .on('renameChannel', (data) => {
      store.dispatch(channelsActions.renameChannel(data));
    })
    .on('newMessage', (message) => {
      store.dispatch(messagesActions.addMessage(message));
    })
    .on('disconnect', () => {
      notifiers.error(i18n.t, 'networkError');
    });

  const socketPromise = (action, cb = null) => (data, t) => new Promise((resolve, reject) => {
    socket.timeout(socketTimeout).emit(action, data, (error, response) => {
      if (error) {
        reject(error);
      } else {
        if (cb) {
          cb(t, response);
        }
        resolve(response);
      }
    });
  });

  return {
    addMessage: socketPromise('newMessage'),
    addChannel: socketPromise('newChannel', (t, { data }) => {
      store.dispatch(channelsActions.addChannel(data));
      store.dispatch(channelsActions.setActiveChannel(data.id));
      notifiers.addChannel(t);
    }),
    removeChannel: socketPromise('removeChannel', (t) => notifiers.removeChannel(t)),
    renameChannel: socketPromise('renameChannel', (t) => notifiers.renameChannel(t)),
  };
};

export default buildChatApi;
