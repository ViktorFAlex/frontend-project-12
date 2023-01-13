import { useContext } from 'react';

import customContext from '../contexts/index.jsx';

const useCustomContext = () => useContext(customContext);

export default useCustomContext;
