import { createContext } from 'react';

const chatApiContext = createContext({
  addMessage: async () => {},
  addChannel: async () => {},
  removeChannel: async () => {},
  renameChannel: async () => {},
});

export default chatApiContext;
