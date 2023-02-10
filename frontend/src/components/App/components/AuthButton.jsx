import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../../hooks/index';

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuthContext();

  const handleClick = () => {
    auth.logOut();
  };

  return (
    auth.loginStatus.username
      ? <Button onClick={handleClick}>{t('elements.toLogout')}</Button>
      : null
  );
};

export default AuthButton;
