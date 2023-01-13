import warningToast from './warningToast';
import successToast from './successToast';
import errorToast from './errorToast';

export default {
  userExists: (translation) => errorToast(translation('validators.userExists')),
  loggedOut: (translation) => warningToast(translation('toast.loggedOut')),
  signedUp: (translation) => successToast(translation('toast.signedUp')),
  networkError: (translation) => errorToast(translation('toast.networkError')),
  addChannel: (translation) => successToast(translation('toast.add')),
  renameChannel: (translation) => successToast(translation('toast.rename')),
  removeChannel: (translation) => successToast(translation('toast.remove')),
};
