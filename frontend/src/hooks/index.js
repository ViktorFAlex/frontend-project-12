import { useContext } from 'react';
import { AuthContext, ChatApiContext, ModalContext } from '../contexts/index';

export const useAuthContext = () => useContext(AuthContext);

export const useChatApiContext = () => useContext(ChatApiContext);

export const useModalContext = () => useContext(ModalContext);
