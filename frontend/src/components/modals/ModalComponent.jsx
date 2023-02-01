import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import getModal from './common-components/index';
import selectors from '../../slices/selectors';
import useModalContext from '../../hooks/useModalContext';

const ModalComponent = () => {
  const { t } = useTranslation();
  const { modalType } = useSelector(selectors.selectModalInfo);
  const { handleHide } = useModalContext();

  if (!modalType) {
    return null;
  }
  const Component = getModal(modalType);
  return (
    <>
      <Modal.Header closeButton onHide={handleHide}>
        <Modal.Title>{t(`channels.${modalType}`)}</Modal.Title>
      </Modal.Header>
      <Component />
    </>
  );
};

export default ModalComponent;
