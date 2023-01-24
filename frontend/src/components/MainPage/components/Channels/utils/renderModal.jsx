import getModal from '../../../../modals/index';

const renderModal = ({ modalInfo, channelNames }) => {
  const { modalType, modalItem, onHide } = modalInfo;
  if (!modalType) {
    return null;
  }
  const Component = getModal(modalType);
  return (
    <Component item={modalItem} onHide={onHide} names={channelNames} />
  );
};

export default renderModal;
