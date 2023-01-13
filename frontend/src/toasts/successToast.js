import { toast } from 'react-toastify';

export default (message) => {
  toast.success(message, {
    theme: 'dark',
    toastId: message,
  });
};
