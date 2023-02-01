import ChatApiContext from '../../../contexts/chatApiContext';

const ChatApiProvider = ({ children, chatApi }) => (
  <ChatApiContext.Provider value={chatApi}>
    {children}
  </ChatApiContext.Provider>
);

export default ChatApiProvider;
