import { createContext } from 'react';

const modalContext = createContext({
  show: false,
  handleShow: () => {},
  handleHide: () => {},
});

export default modalContext;
