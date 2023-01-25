import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

export default (message) => {
  toast.success(message, {
    theme: 'dark',
    toastId: uuid(),
  });
};
