import store from '../slices/index.js';
import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';

const buildChatApi = (socket) => {
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
    });

  const socketPromise = (action, cb) => (data, handler) => new Promise((resolve, reject) => {
    socket.timeout(socketTimeout).emit(action, data, (error, response) => {
      if (error) {
        reject(error);
      } else {
        if (cb) {
          cb(handler, response);
        }
        resolve(response);
      }
    });
  });

  return {
    addMessage: socketPromise('newMessage'),
    addChannel: socketPromise('newChannel', (handler, { data }) => {
      handler(data);
    }),
    removeChannel: socketPromise('removeChannel', (handler) => handler()),
    renameChannel: socketPromise('renameChannel', (handler) => handler()),
  };
};

export default buildChatApi;
