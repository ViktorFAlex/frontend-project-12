import { Modal } from 'react-bootstrap';
import ModalComponent from './ModalComponent';
import useModalContext from '../../hooks/useModalContext';

const ModalLayout = () => {
  const { show } = useModalContext();
  return (
    <Modal show={show} centered>
      <ModalComponent />
    </Modal>
  );
};

export default ModalLayout;
