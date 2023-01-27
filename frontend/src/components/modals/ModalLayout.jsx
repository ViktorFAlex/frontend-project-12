import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import getModal from './common-components/index';
import selectors from '../../slices/selectors';
import { actions as modalsActions } from '../../slices/modalsSlice';

const ModalLayout = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { modalType } = useSelector(selectors.selectModalInfo);
  if (!modalType) {
    return null;
  }
  const Component = getModal(modalType);
  const handleHide = () => dispatch(modalsActions.hideModal());
  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={handleHide}>
        <Modal.Title>{t(`channels.${modalType}`)}</Modal.Title>
      </Modal.Header>
      <Component />
    </Modal>
  );
};

export default ModalLayout;
