import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import img from '../../../../../../assets/plus-square.svg';
import { actions as modalsActions } from '../../../../../../slices/modalsSlice';
import useModalContext from '../../../../../../hooks/useModalContext';

const Header = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { handleShow } = useModalContext();
  const handleClick = () => {
    handleShow();
    dispatch(modalsActions.showModal({ type: 'add' }));
  };

  return (
    <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
      <span>{t('elements.channels')}</span>
      <button type="button" className="text-primary btn btn-group-vertical p-0" onClick={handleClick}>
        <img src={img} alt={t('elements.add')} />
        <span className="visually-hidden">{t('elements.plus')}</span>
      </button>
    </div>
  );
};

export default Header;
