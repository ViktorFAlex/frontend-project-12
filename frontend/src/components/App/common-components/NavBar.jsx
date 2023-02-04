import { Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import routes from '../../../routes/index';
import AuthButton from './AuthButton';

const NavBar = () => {
  const { t } = useTranslation(); return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <Navbar.Brand as={Link} to={routes.app.mainRoute()}>{t('elements.hexlet')}</Navbar.Brand>
        <AuthButton />
      </div>
    </Navbar>
  );
};

export default NavBar;
