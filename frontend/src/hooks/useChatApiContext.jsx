import { useContext } from 'react';
import chatApiContext from '../contexts/chatApiContext';

const useAuthContext = () => useContext(chatApiContext);

export default useAuthContext;
