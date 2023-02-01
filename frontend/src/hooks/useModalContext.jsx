import { useContext } from 'react';
import modalContext from '../contexts/modalContext';

const useModalContext = () => useContext(modalContext);

export default useModalContext;
