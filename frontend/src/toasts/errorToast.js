import { toast } from 'react-toastify';

export default (message) => {
  toast.error(message, {
    theme: 'dark',
    toastId: message,
  });
};
