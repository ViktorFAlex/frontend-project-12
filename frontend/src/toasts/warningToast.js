import { toast } from 'react-toastify';

export default (message) => {
  toast.warn(message, {
    theme: 'dark',
    toastId: message,
  });
};
