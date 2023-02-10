import successToast from './successToast';
import errorToast from './errorToast';

export default {
  error: (translation, message) => errorToast(translation(`errors.${message}`)),
  addChannel: (translation) => successToast(translation('toast.add')),
  renameChannel: (translation) => successToast(translation('toast.rename')),
  removeChannel: (translation) => successToast(translation('toast.remove')),
};
