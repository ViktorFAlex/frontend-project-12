import { useContext } from 'react';
import authContext from '../contexts/authContext';

const useAuthContext = () => useContext(authContext);

export default useAuthContext;
