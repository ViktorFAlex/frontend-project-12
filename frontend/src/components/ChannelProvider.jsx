import { io } from 'socket.io-client';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import notifiers from '../toasts/index';
import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';
import ChannelContext from '../contexts/index';

const socket = io();
const socketTimeout = 4000;

const ChannelProvider = ({ children }) => {
  const { t } = useTranslation();
  const defaultChannelId = 1;
  const [activeChannelId, setActiveChannelId] = useState(defaultChannelId);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on('connect', () => {
    });
    socket.on('newChannel', (data) => {
      dispatch(channelsActions.addChannel(data));
      notifiers.addChannel(t);
    });
    socket.on('removeChannel', ({ id }) => {
      dispatch(channelsActions.removeChannel(id));
      notifiers.removeChannel(t);
    });
    socket.on('renameChannel', (data) => {
      dispatch(channelsActions.renameChannel(data));
      notifiers.renameChannel(t);
    });
    socket.on('newMessage', (message) => {
      dispatch(messagesActions.addMessage(message));
    });
    socket.on('disconnect', () => {
      notifiers.networkError(t);
    });
  });

  const socketPromise = (action, cb) => (data) => new Promise((resolve, reject) => {
    socket.timeout(socketTimeout).emit(action, data, (error, response) => {
      if (error) {
        reject(new Error('network Error'));
      } else {
        if (cb) {
          cb(response);
        }
        resolve(response);
      }
    });
  });

  const socketHandlers = useMemo(() => ({
    addMessage: socketPromise('newMessage'),
    addChannel: socketPromise('newChannel', ({ data }) => setActiveChannelId(data.id)),
    removeChannel: socketPromise('removeChannel', () => setActiveChannelId(defaultChannelId)),
    renameChannel: socketPromise('renameChannel'),
  }), []);

  const handlers = useMemo(() => ({
    socketHandlers,
    activeChannelId,
    setActiveChannelId,
  }), [activeChannelId, socketHandlers]);
  return (
    <ChannelContext.Provider value={handlers}>
      {children}
    </ChannelContext.Provider>
  );
};

export default ChannelProvider;
