import { io } from 'socket.io-client';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import notifiers from '../toasts/index';
import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';
import ChannelContext from '../contexts/index';

const socket = io();

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

  const removeChannel = (id) => socket.emit('removeChannel', ({ id }), () => {
    setActiveChannelId(defaultChannelId);
  });
  const renameChannel = ({ name, id }) => socket.emit('renameChannel', ({ id, name }));
  const addChannel = (name) => {
    socket.emit('newChannel', ({ name }), ({ data }) => {
      setActiveChannelId(data.id);
    });
  };
  const addMessage = (message, channelId, author) => socket.emit('newMessage', ({ message, channelId, author }));
  const handlers = useMemo(() => ({
    channelHandlers: { removeChannel, renameChannel, addChannel },
    messageHandlers: { addMessage },
    activeChannelId,
    setActiveChannelId,
  }), [activeChannelId]);
  return (
    <ChannelContext.Provider value={handlers}>
      {children}
    </ChannelContext.Provider>
  );
};

export default ChannelProvider;
