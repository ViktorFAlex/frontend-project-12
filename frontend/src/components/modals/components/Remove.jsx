import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import selectors from '../../../slices/selectors';
import { useChatApiContext, useModalContext } from '../../../hooks/index';
import notifiers from '../../../toasts/index';

const Remove = () => {
  const { t } = useTranslation();
  const chatApi = useChatApiContext();

  const { modalItem } = useSelector(selectors.selectModalInfo);
  const { handleHide } = useModalContext();
  const handleResponse = () => notifiers.removeChannel(t);

  const handleRemove = async () => {
    try {
      await chatApi.removeChannel({ id: modalItem }, handleResponse);
      handleHide();
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  };

  return (
    <Modal.Body>
      <p className="lead">{t('elements.sure')}</p>
      <div className="d-flex justify-content-end">
        <Button
          type="button"
          variant="secondary"
          className="me-2"
          onClick={handleHide}
        >
          {t('elements.cancel')}
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={handleRemove}
        >
          {t('elements.remove')}
        </Button>
      </div>
    </Modal.Body>
  );
};

export default Remove;
