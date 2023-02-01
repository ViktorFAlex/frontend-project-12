import { useState, useMemo } from 'react';
import ModalContext from '../../../../../../contexts/modalContext';

const ModalProvider = ({ children }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  const modalHandlers = useMemo(() => ({
    show, handleHide, handleShow,
  }), [show]);
  console.log(show);
  return (
    <ModalContext.Provider value={modalHandlers}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
