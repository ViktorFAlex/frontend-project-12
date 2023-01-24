import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuthContext from '../../../hooks/useCustomContext';
import notifiers from '../../../toasts/index';

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuthContext();
  const handleClick = () => {
    notifiers.loggedOut(t);
    auth.logOut();
  };
  return (
    auth.loggedIn
      ? <Button onClick={handleClick}>Выйти</Button>
      : null
  );
};

export default AuthButton;
