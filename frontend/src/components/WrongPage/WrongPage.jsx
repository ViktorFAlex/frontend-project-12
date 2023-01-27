import { useTranslation } from 'react-i18next';
import img from '../../assets/notfound.svg';
import routes from '../../routes/routes';

const WrongPage = () => {
  const { appRoutes } = routes;
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt={t('elements.notFound')} className="img-fluid h-25" src={img} />
      <h1 className="h4 text-muted">{t('elements.notFound')}</h1>
      <p className="text-muted">
        {t('elements.youCanNavigate')}
        {' '}
        <a href={appRoutes.main}>{t('elements.toMainPage')}</a>
      </p>
    </div>
  );
};

export default WrongPage;
