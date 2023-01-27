import warningToast from './warningToast';
import successToast from './successToast';
import errorToast from './errorToast';

export default {
  logOut: (translation) => warningToast(translation('toast.logOut')),
  loggedIn: (translation) => successToast(translation('toast.loggedIn')),
  error: (translation, message) => errorToast(translation(`errors.${message}`)),
  addChannel: (translation) => successToast(translation('toast.add')),
  renameChannel: (translation) => successToast(translation('toast.rename')),
  removeChannel: (translation) => successToast(translation('toast.remove')),
};
