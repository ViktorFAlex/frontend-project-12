import { useTranslation } from 'react-i18next';
import img from '../../../../../assets/plus-square.svg';

const Header = ({ showModal }) => {
  const { t } = useTranslation();
  return (
    <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
      <span>{t('elements.channels')}</span>
      <button type="button" className="text-primary btn btn-group-vertical p-0" onClick={() => showModal('adding')}>
        <img src={img} alt={t('elements.add')} />
        <span className="visually-hidden">{t('elements.plus')}</span>
      </button>
    </div>
  );
};

export default Header;
