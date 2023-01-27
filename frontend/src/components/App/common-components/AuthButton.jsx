import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useCustomContext from '../../../hooks/useCustomContext';
import notifiers from '../../../toasts/index';

const AuthButton = () => {
  const { t } = useTranslation();
  const { loginHandlers } = useCustomContext();

  const handleClick = () => {
    notifiers.logOut(t);
    loginHandlers.logOut();
  };

  return (
    loginHandlers.loginStatus.isLogged
      ? <Button onClick={handleClick}>{t('elements.toLogout')}</Button>
      : null
  );
};

export default AuthButton;
