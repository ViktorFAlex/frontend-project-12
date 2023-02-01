import { createContext } from 'react';

const authContext = createContext({
  loginStatus: {},
  logIn: () => {},
  logOut: () => {},
  getAuthHeaders: () => {},
});

export default authContext;
