import { ChatApiContext } from '../../contexts/index';

const ChatApiProvider = ({ children, chatApi }) => (
  <ChatApiContext.Provider value={chatApi}>
    {children}
  </ChatApiContext.Provider>
);

export default ChatApiProvider;
