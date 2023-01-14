import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Remove = ({ onHide, handler, item }) => {
  const { t } = useTranslation();
  const handleRemove = async () => {
    try {
      await handler({ id: item });
      onHide();
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  };
  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('channels.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('elements.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            variant="secondary"
            className="me-2"
            onClick={onHide}
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
    </Modal>
  );
};

export default Remove;
